import { useState } from "react";
import IconButton from '@mui/material/IconButton';

export function Counter() {
  const [like, setLike] = useState(0);
  const [dislike, setDisLike] = useState(0);
  return (
    <div className="button">
      <IconButton className="piece" color="success" onClick={() => { setLike(like + 1); }} aria-label="delete">
        &#128077;<span> <h3>{like}</h3></span>
      </IconButton>

      <IconButton className="piece" color="warning" onClick={() => { setDisLike(dislike + 1); }} aria-label="delete">&#128078; <span><h3>{dislike}</h3></span> </IconButton>
    </div>
  );
}
