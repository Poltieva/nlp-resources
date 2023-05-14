from encode_query import load_embeddings
from sentence_transformers import SentenceTransformer
from sys import argv
import pickle

def main(model, id):
    embeddings = load_embeddings()
    for dict in embeddings:
        if id in dict.keys():
            dict[id] = model.encode(open(f'/home/deploy/apps/nlp-resources/tmp/{id}.description.txt', 'r').read())
            break
    with open('/home/deploy/apps/nlp-resources/shared/embeddings.pkl', 'wb') as f:
        pickle.dump(embeddings, f)
    

if __name__ == '__main__':
    model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
    id = argv[1]
    print(main(model, id))