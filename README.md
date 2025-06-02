 NETTOYAGE ET VALIDATION
Objectifs :
Supprimer lignes critiques manquantes (nom, email)

Corriger revenu non numérique ou manquant

Valider les emails avec @

python
Copy
Edit
from pyspark.sql.functions import when, col

df_clean = df.filter(col("nom").isNotNull() & col("email").isNotNull())

df_clean = df_clean.withColumn(
    "revenu",
    when(col("revenu").isNull() | (col("revenu") == "NaN"), 0).otherwise(col("revenu").cast("double"))
)

df_clean = df_clean.filter(col("email").contains("@"))
df_clean.show()




TRANSFORMATION DES DONNÉES
Objectifs :
Formater la date

Uniformiser les noms/prénoms/emails

python
Copy
Edit
from pyspark.sql.functions import to_date, upper, lower, initcap

df_transformed = df_clean.withColumn("date_naissance", to_date("date_naissance", "yyyy-MM-dd")) \
    .withColumn("nom", upper(col("nom"))) \
    .withColumn("prenom", initcap("prenom")) \
    .withColumn("email", lower("email"))

df_transformed.show()



ENRICHISSEMENT AVEC API (Geo API Gouv)
🎯 Objectif : ajouter le code_postal depuis une API externe
python
Copy
Edit
import requests
import json

# Collecte des villes uniques
villes = [row["ville"] for row in df_transformed.select("ville").distinct().collect()]

# Appel API et création de tuples
resultats = []
for ville in villes:
    try:
        response = requests.get(f"https://geo.api.gouv.fr/communes?nom={ville}&fields=codesPostaux&format=json")
        json_data = response.json()
        if json_data:
            resultats.append((ville, json_data[0]["codesPostaux"][0]))
    except:
        resultats.append((ville, None))

# Injection dans Spark
df_codes = spark.createDataFrame(resultats, ["ville", "code_postal"])

# Enrichissement
df_enriched = df_transformed.join(df_codes, on="ville", how="left")
df_enriched.show()


CALCUL DISTRIBUÉ
🎯 Objectifs :
Filtrage revenu > 30000

GroupBy sur ville

Window function (ranking)

Optimisation avec repartition

python
Copy
Edit
from pyspark.sql.window import Window
from pyspark.sql.functions import row_number, avg, desc

# Filtering
df_filtered = df_enriched.filter(col("revenu") > 30000)

# GroupBy
df_grouped = df_filtered.groupBy("ville").agg(avg("revenu").alias("revenu_moyen"))
df_grouped.show()

# Window function
windowSpec = Window.partitionBy("ville").orderBy(desc("revenu"))
df_ranked = df_filtered.withColumn("rang_revenu", row_number().over(windowSpec))
df_ranked.select("ville", "prenom", "revenu", "rang_revenu").show()

# Repartition pour charge équilibrée
df_optimized = df_ranked.repartition("ville")
6️⃣ OPÉRATIONS SQL
🎯 Objectif : filtrer les top clients (revenu élevé par ville)
python
Copy
Edit
df_optimized.createOrReplaceTempView("clients")

top_clients = spark.sql("""
    SELECT ville, prenom, revenu, rang_revenu
    FROM clients
    WHERE rang_revenu = 1
    ORDER BY revenu DESC
""")
top_clients.show()
