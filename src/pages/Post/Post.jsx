import styles from './Post.module.css';
import { useParams } from 'react-router-dom';

import { useFetchDocument } from '../../hooks/useFetchDocument';

const Post = () => {
    const { id } = useParams();
    const {document: post, loading} = useFetchDocument("posts", id);

  return (
    <div className={styles.post_container}>
        {loading && <p>Carregando...</p>}
        {post && (
            <>
              <h1>{post.title}</h1>
              <img src={post.image} alt={post.title} />
              <p>{post.body}</p>
              <h3>Este post trata sobre:</h3>
              {post.tags.map((tag) => (
                <p key={tag} className={styles.tags}><span>#</span>{tag}</p>
              ))}
              {post.createdBy && <h3>Post de <span>{post.createdBy}</span></h3>
              }
            </>
        )}
    </div>
  )
}

export default Post