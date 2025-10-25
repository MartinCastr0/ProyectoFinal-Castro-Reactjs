import React from 'react'

export default class ErrorBoundary extends React.Component{
  constructor(props){
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error){
    return { error }
  }
  componentDidCatch(error, info){
    // Could send to logging service
    console.error('ErrorBoundary caught', error, info)
  }
  render(){
    if(this.state.error){
      return (
        <div style={{padding:20,background:'#fff3cd',color:'#664d03',minHeight:'100vh'}}>
          <h2>Ocurrió un error en la aplicación</h2>
          <p>Mensaje: {String(this.state.error.message || this.state.error)}</p>
          <pre style={{whiteSpace:'pre-wrap',fontSize:12,marginTop:10}}>{String(this.state.error.stack || '')}</pre>
          <p>Revisá la consola del navegador para más detalles.</p>
        </div>
      )
    }
    return this.props.children
  }
}
