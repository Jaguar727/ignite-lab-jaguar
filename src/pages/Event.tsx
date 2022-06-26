import { useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"
import { Video } from "../components/Video"

interface LocationStateProps {
  data?: {
    createSubscriber: any
  }
}

export function Event() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  function setCookie(param: string) {
    const d = new Date();
    d.setTime(d.getTime() + (12*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = `${param}=true;` + expires;
  }

  function getCookie(param: string) {
    let authorized = false
    let decodedCookie = decodeURIComponent(document.cookie);
    if (!decodedCookie) {
      return authorized
    }
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      const [key,value] = ca[i].split('=')
      if (key == param && value == 'true') {
        authorized = true
      }
    }
    return authorized;
  }

  useEffect(() => {
    const isAuthorized = getCookie('Autorizado')
    if (isAuthorized) {
      return
    }

    const [_,code] = location.search.split('=')
    const state = location.state as LocationStateProps
    if (code || state?.data?.createSubscriber) {
      setCookie('Autorizado')
      return
    }
    
      navigate('/')
  })

  return(
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {slug 
        ? <Video lessonSlug={slug}/> 
        : <div className = "flex-1"/>}
        <Sidebar />
      </main>
    </div>
  )
}