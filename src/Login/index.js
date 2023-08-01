import Cookies from 'js-cookie'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
const Login = () => {

    const [name, setName] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate();
    const sux = (id) => {

        Cookies.set('id', id, { expires: 78 })

    }

    const submitted = async (event) => {
        event.preventDefault()

        const uspas = { Email: name, Password: pass }
        try {
            const response = await fetch(
                `https://bursting-gelding-24.hasura.app/api/rest/get-user-id?email=${name}&password=${pass}`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
                },
            }
            );
            const data = await response.json();
            console.log('data', data);
           const { get_user_id } = data

            const { id } = get_user_id[0]
            //console.log(id);


            if (id !== undefined) {
                sux(id)
                navigate("/profile")
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    const inpt = (e) => {
        setName(e.target.value)
    }

    const pt = (e) => {
        setPass(e.target.value)
    }

    return (
        <form onSubmit={submitted} style={{ height:"100vh", alignItems:"center",display: "flex", flexDirection: "column",justifyContent: "center"}}>
            <div style={{border:"2px solid black", height:"240px", textAlign:'center'}}>
            <div style={{marginLeft:"18px", flexDirection:"row",  marginTop:"30px", display:"flex",alignItems:'center'}}>
        <span className="title">Money</span><span className="title" style={{color:"#02969C"}}>Matters</span>
      </div>
            <div style={{margin:"24px"}}>
                <label style={{marginRight:"8px"}}>Email</label>
                <input onChange={inpt} type="text" />
            </div>
            <div  style={{margin:"24px"}}>
            <label style={{marginRight:"8px"}}>Password</label>
                <input onChange={pt} type="password" />
            </div>
            <div style={{textAlign:"center"}}>
                <button style={{color:"white", padding:"8px",backgroundColor:"green", border:"2px solid white", borderRadius:"8px"}} type="submit" >Submit</button>
            </div>
            </div>
        </form>
    )
}

export default Login