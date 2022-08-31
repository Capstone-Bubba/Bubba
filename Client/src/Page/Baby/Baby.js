import { Grid } from '@mui/material'
import { useEffect } from "react";
import BabyForm from '../../Component/Baby/BabyForm'

function SignUp() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <BabyForm/>
     
        </Grid>
    </div>
  )
}

export default SignUp
