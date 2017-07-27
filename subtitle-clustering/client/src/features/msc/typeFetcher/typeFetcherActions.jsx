import {TYPES_FETCHED,TYPES_FETCH} from "./typeFetcherConstants";
export function fetch_types() {
    return (dispatch,getState) => {
      dispatch({type:TYPES_FETCH})

      //async fetch
        var init = {
        "Extractors": {
          "types": [{
            "name": "CountExtractor",
            "id": "count",
            "params": {
              "min_df": {
                "description": "Szavakhoz rendelt s\u00faly minim\u00e1lis \u00e9rt\u00e9ke, amit m\u00e9g bevehet\u00fcnk a sz\u00f3t\u00e1rba",
                "type": "float"
              },
              "max_df": {
                "description": "Szavakhoz rendelt s\u00faly maxim\u00e1lis \u00e9rt\u00e9ke, amit m\u00e9g bevehet\u00fcnk a sz\u00f3t\u00e1rba",
                "type": "float"
              }
            },
            "output_type": "ExtractionResult",
            "input_types": ["DocumentsResult"]
          }, {
            "name": "TFIDFExtractor",
            "id": "tfidf",
            "params": {
              "min_df": {
                "description": "Szavakhoz rendelt s\u00faly minim\u00e1lis \u00e9rt\u00e9ke, amit m\u00e9g bevehet\u00fcnk a sz\u00f3t\u00e1rba",
                "type": "float"
              },
              "max_df": {
                "description": "Szavakhoz rendelt s\u00faly maxim\u00e1lis \u00e9rt\u00e9ke, amit m\u00e9g bevehet\u00fcnk a sz\u00f3t\u00e1rba",
                "type": "float"
              }
            },
            "output_type": "ExtractionResult",
            "input_types": ["DocumentsResult"]
          }, {
            "name": "HashingExtractor",
            "id": "hash",
            "params": {
              "use_idf": {
                "description": "Haszn\u00e1ljunk-e tfidf s\u00faly\u00f3zot hashel\u00e9s ut\u00e1n",
                "type": 'bool'
              }
            },
            "output_type": "ExtractionResult",
            "input_types": ["DocumentsResult"]
          }],
          "params": {
            "max_features": {
              "description": "A szavak maxim\u00e1lis sz\u00e1ma amit kinyerhet\u00fcnk.",
              "type": "int"
            }
          }
        },
        "Dimension Reductions": {
          "types": [{
            "name": "LatentSemanticAnalysis",
            "id": "lsa",
            "output_type": "DimensionReductionResult",
            "input_types": ["ExtractionResult", "DimensionReductionResult"]
          }, {
            "name": "LatentDirichletAllocation",
            "id": "lda",
            "output_type": "DimensionReductionResult",
            "input_types": ["ExtractionResult", "DimensionReductionResult"]
          }, {
            "name": "NonNegativeMatrixFactorization",
            "id": "nmf",
            "output_type": "DimensionReductionResult",
            "input_types": ["ExtractionResult", "DimensionReductionResult"]
          }],
          "params": {
            "output_dimensions": {
              "description": "Redukci\u00f3 ut\u00e1n kiv\u00e1nt dimenzi\u00f3k sz\u00e1ma",
              "type": "int"
            }
          }
        },
        "Clustering methods": {
          "types": [{
            "name": "Kmeans",
            "id": "kmeans",
            "params": {
              "n_cluster": {
                "description": "Megadhat\u00f3 a kimenetben l\u00e9trej\u00f6tt klaszterek sz\u00e1ma",
                "type": "int"
              }
            },
            "output_type": "ClusteringResult",
            "input_types": ["DimensionReductionResult", "ExtractionResult"]
          }, {
            "name": "MKmeans",
            "id": "mkmeans",
            "params": {
              "n_cluster": {
                "description": "Megadhat\u00f3 a kimenetben l\u00e9trej\u00f6tt klaszterek sz\u00e1ma",
                "type": "int"
              }
            },
            "output_type": "ClusteringResult",
            "input_types": ["DimensionReductionResult", "ExtractionResult"]
          }, {
            "name": "AffinityClustering",
            "id": "affinity",
            "params": {
              "preference": {
                "description": "Milyen m\u00e9rt\u00e9kben nevezz\u00fcnk ki egy pontot mint k\u00e9pvisel\u0151",
                "type": "int"
              },
              "damping": {
                "description": "Klaszterez\u00e9s konvergenci\u00e1j\u00e1t szab\u00e1lyozza",
                "type": "float"
              }
            },
            "output_type": "ClusteringResult",
            "input_types": ["DimensionReductionResult", "ExtractionResult"]
          }, {
            "name": "DBScan",
            "id": "dbscan",
            "params": {
              "eps": {
                "description": "Pontok milyen s\u0171r\u0171n kell elhelyezkedjenek hogy klasztert alkothassanak",
                "type": "float"
              },
              "min_samples": {
                "description": "Egy klaszterben l\u00e9v\u0151 pontok minim\u00e1lis sz\u00e1ma",
                "type": "int"
              }
            },
            "output_type": "ClusteringResult",
            "input_types": ["DimensionReductionResult", "ExtractionResult"]
          }, {
            "name": "HierarchicalClustering",
            "id": "hierarchical",
            "params": {
              "n_cluster": {
                "description": "Megadhat\u00f3 a kimenetben l\u00e9trej\u00f6tt klaszterek sz\u00e1ma",
                "type": "int"
              },
              "linkage": {
                "description": "Milyen strat\u00e9gi\u00e1t haszn\u00e1ljunk a hierarchi\u00e1k k\u00e9szit\u00e9sekor",
                "possible_values": ["ward", "complete", "average"]
              }
            },
            "output_type": "ClusteringResult",
            "input_types": ["DimensionReductionResult", "ExtractionResult"]
          }, {
            "name": "MeanShiftClustering",
            "id": "meanshift",
            "params": {
              "n_cluster": {
                "description": "Megadhat\u00f3 a kimenetben l\u00e9trej\u00f6tt klaszterek sz\u00e1ma",
                "type": "int"
              }
            },
            "output_type": "ClusteringResult",
            "input_types": ["DimensionReductionResult", "ExtractionResult"]
          }]
        },
        "Analysis methods": {
          "types": [{
            "name": "SilhouetteAnalysis",
            "id": "silhouette",
            "output_type": "SilhouetteResult",
            "input_types": [
              ["DimensionReductionResult", "ExtractionResult"],
              ["ClusteringResult"]
            ]
          }, {
            "name": "CalinskiHarabazAnalysis",
            "id": "ch",
            "output_type": "CalinskiHarabazResult",
            "input_types": [
              ["DimensionReductionResult", "ExtractionResult"],
              ["ClusteringResult"]
            ]
          }]
        },
        "Exports": {
          "types": [{
            "name": "ValuePlotter",
            "id": "vplot",
            "params": {
              "x_title": {
                "description": "X tengely felirata.",
                "type": "string"
              },
              "y_title": {
                "description": "Y tengely felirata.",
                "type": "string"
              },
              "ax_title": {
                "description": "Az \u00e1bra c\u00edme",
                "type": "string"
              },
              "key": {
                "description": "Kulcs amit haszn\u00e1lhatunk \u00e1br\u00e1zol\u00e1s sor\u00e1n, el\u00f6z\u0151 folyamat result kulcsaib\u00f3l v\u00e1laszthatunk",
                "type": "string"
              }
            },
            "input_types": ["RangeResult"]
          }]
        },
        "Other": {
          "types": [{
            "name": "RangeTask",
            "id": "range_task"
          }],
          "params": {
            "attr": {
              "description": "V\u00e1ltoztatand\u00f3 attributum",
              "type": "string"
            },
            "rtype": {
              "description": "Tipus",
              "possible_values": ["float","int"]
            },
            "rfrom": {
              "description": "Honnan induljon",
              "type": "float"
            },
            "rto": {
              "description": "Meddig menjen",
              "type": "float"
            },
            "inc": {
              "description": "Hanyasaval",
              "type": "float"
            }}}}
      setTimeout(() => dispatch({type:TYPES_FETCHED, payload:{types:init}}), 10);
    }
}
