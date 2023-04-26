import numpy as np
from sentence_transformers import SentenceTransformer
from pickle import dump as pickle_dump
from sys import argv

def main(id):
    description = open(f'../backend/tmp/{id}.description.txt', 'r').read().strip()
    # tags = eval(open(f'../backend/tmp/{id}.keywords.txt', 'r').read().strip())
    model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
    description_embeddings = model.encode(description)
    # tags_embeddings = np.mean(model.encode(tags), axis = 0)
    ### applied to the list of category embeddings to obtain a single vector
    # that represents the average semantic content of all the categories 
    # associated with the book. 
    # This is a common technique in NLP for reducing a list of embeddings into a single vector 
    # that captures the overall semantic content of the list.

    # embedding = np.concatenate([description_embeddings, tags_embeddings], axis=0)
    # concatenating to obtain a single vector
    
    with open('./db/embeddings.pkl', 'ab') as f:
        # pickle_dump({id: embedding}, f)
        pickle_dump({id: description_embeddings}, f)

if __name__ == '__main__':
    main(argv[1])