from sentence_transformers import SentenceTransformer
from sys import argv, exit

def encode_query(query):
    try:
        embedding = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2').encode(query)
    except:
        print("Error encoding query")
        exit(1)

    print(embedding.tolist())

if __name__ == '__main__':
    encode_query(argv[1])
