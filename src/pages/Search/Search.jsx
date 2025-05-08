
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

import PostDetail from '../../components/PostDetail';
import { Link } from 'react-router-dom';

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const {documents: posts} = useFetchDocuments("posts", search);

  return (
    <div>
        {posts && posts.length !== 0 && <h2>Posts encontrados:</h2>}
        <div>
            {
                posts && posts.length === 0 && 
                <div>
                    <h3>Não foram encontrados posts a partir da sua busca...</h3> 
                    <Link to="/" className='btn btn-dark'>Voltar</Link>
                </div>
            }
            {posts && posts.map((post) => (
                <PostDetail key={post.id} post={post}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <p>Tags: {post.tags.join(", ")}</p>
                </PostDetail>
            ))}
        </div>
    </div>
  )
}

export default Search