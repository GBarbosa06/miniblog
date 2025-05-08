import styles from "./EditPost.module.css"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useUpdateDocument } from "../../hooks/useUpdateDocument"
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { document: post , loading} = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState(null);

  useEffect(() =>{
    if(post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      setTags(post.tags.join(", "));
    }
  }, [post])

  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument("posts");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //URL validation:
    try{
      new URL(image)

    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }
    //tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    setTags(tagsArray);

    //check values
    if (!title || !image || !body || tagsArray.length === 0 || tagsArray.every(t => t === "")) {
      setFormError("Por favor, preencha todos os campos.");
    }


    if(formError) return;


    updateDocument(id, {
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    })

    //redirect to home page
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      <h2>Editando o post: {title}</h2>
      <p>Altere os dados do post como desejar</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input 
            type="text" 
            name="title" 
            required 
            placeholder="Pense em um título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input 
            type="text" 
            name="image" 
            required 
            placeholder="Insira uma imagem que represente o post"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <p className={styles.preview_title}>Preview da imagem atual:</p>
        <img className={styles.preview_image} src={image} alt={title} />
        <label>
          <span>Conteúdo:</span>
          <textarea 
            name="body" 
            required 
            placeholder="Insira o conteúdo do post"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <label>
          <span>Tags:</span>
          <input 
            type="text" 
            name="tags" 
            required 
            placeholder="Insira as tags separadas por vírgula"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>

        {!response.loading && <button className="btn">Concluir</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde.. .
          </button>
        )}
        <button className="btn btn-danger" onClick={() => {navigate("/dashboard")}}>Cancelar</button>
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
        
      </form>
    </div>
  )
}

export default EditPost