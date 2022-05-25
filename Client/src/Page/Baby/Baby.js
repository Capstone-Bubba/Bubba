import { Grid } from '@mui/material'
import React from 'react'
import BabyForm from '../../Component/Baby/BabyForm'

function SignUp() {
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
