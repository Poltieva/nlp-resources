from sentence_transformers import SentenceTransformer
from sys import argv, exit
import pickle
import tensorflow as tf
import numpy as np

def encode_query(model, query, tags = []):
    try:
        query_embedding = model.encode(query)     
        # tags_embedding = np.mean(model.encode(tags), axis = 0)
    except:
        print("Error encoding query")
        exit(1)

    # return np.concatenate([query_embedding, tags_embedding], axis=0)
    return query_embedding

def load_embeddings():
    in_path = '/home/deploy/apps/nlp-resources/shared/embeddings.pkl'

    books_data = []
    with open(in_path, 'rb') as f:
        while True:
            try:
                book_embeddings = pickle.load(f)
                books_data.append(book_embeddings)
            except EOFError:
                break
    return books_data

def cosine_similarities(a, b):
    return tf.matmul(a, b, transpose_b = True)

def main(model, query, tags = []):
    DB_data = load_embeddings()
    DB_embeddings = tf.constant([list(d.values())[0] for d in DB_data])
    DB_embeddings = tf.nn.l2_normalize(DB_embeddings, axis=1)     
    query_embedding = encode_query(model, query, tags)

    query_embedding = tf.nn.l2_normalize(tf.expand_dims(tf.constant(query_embedding),0), axis=1)
    scores = cosine_similarities(query_embedding, DB_embeddings)
    top_k_indices = tf.math.top_k(scores, 10)[1].numpy().squeeze().tolist()

    candidates = [list(DB_data[i].keys())[0] for i in top_k_indices]

    return candidates

if __name__ == '__main__':
    model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
    query = argv[1]
    print(main(model, query))
