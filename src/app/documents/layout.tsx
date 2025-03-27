interface doc {
    children:React.ReactNode;
}



const layout = ({children}:doc) => {
  return (
    <div>


{children}
    </div>
    
  )
}

export default layout