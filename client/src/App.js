import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Button, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { AppWebsocket, AdminWebsocket } from '@holochain/client'

const HOLO_SOCKET = 'ws://localhost:58623'
const TIMEOUT = 3600
export default function SimpleContainer() {
  const [loading, setLoading] = useState(false)
  const [connected, setConnected] = useState(false)
  const handleClick = () => {
    setLoading(true)
    //
  }
  const pubKey = 'thisisapubkey'
  useEffect(() => {
    ;(async () => {
      try {
        const admin = await AdminWebsocket.connect(
          HOLO_SOCKET,
          TIMEOUT
        )
        await admin.generateAgentPubKey()
        console.log({ admin })
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm' sx={{ textAlign: 'center', minHeight: '300px' }}>
        <Box sx={{ padding: '0.5rem' }}>
          <Typography variant='h5' gutterBottom component='div'>
            Holochain
          </Typography>
          {connected && (
            <>
              <Typography gutterBottom component='div'>
                Agent PubKey: {pubKey}
              </Typography>
            </>
          )}
          <Button variant='outlined' onClick={handleClick}>
            {loading ? 'Connecting..' : 'Connect'}
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  )
}
