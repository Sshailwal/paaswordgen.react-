import { useState  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useCallback } from 'react'
import { useEffect } from 'react'
import {useRef} from 'react'

function App() {
  const [length, setlength] = useState(4)
  const [number, setnumber] = useState(false)
  const [character, setcharacter] = useState(false)
  const [password, setpassword] = useState('')
  const passwordGenerator = useCallback(() => {
    let charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let password = ''
    if (number) charset += '0123456789'
    if (character) charset += '!@#$%^&*()-+='
    for (let i = 0; i < length; i++) {
      let at = Math.floor(Math.random() * charset.length)
      password += charset.charAt(at)
    }
    setpassword(password)
  }
, [length, number, character])
useEffect(() => {
  passwordGenerator()
}
, [passwordGenerator])
const passwordRef = useRef(null)
let referencedcopy = () => {
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
}

  return (
    <>
    <div className='flex justify-center items-center w-fit h-auto bg-gray-700 flex-col rounded-3xl'>
       <h1 className='p-2'>Password Generator</h1>
       <div className='w-full p-4 flex justify-between '>
         <div className='bg-black h-10 w-full pl-5 rounded-md flex items-center justify-between'>
         <input 
        type='text' 
        value = {password}
        placeholder='Your Password' 
        readOnly
        ref = {passwordRef}
        className='outline-none w-full h-full bg-transparent' 
      />
         <div className='h-10 w-20 bg-red-500 ml-auto rounded-md flex justify-center items-center hover:bg-sky-700 cursor-pointer' onClick={referencedcopy} >copy </div>
          
        </div>
      </div>
      <div className='flex justify-between w-full p-4'>
        <div><input 
    type="range" 
    id="lengthSlider" 
    min="4" 
    max="32" 
    value={length} 
    className="w-64 cursor-pointer accent-blue-500" 
    onChange={(e) => setlength(Number(e.target.value))}
/>
      <span id="sliderValue" className="ml-4 font-bold text-lg text-orange-500">Length: {length}</span>

        </div>
      <div>
        <input type="checkbox" id="number" name="number" value={number} onChange={(e)=> setnumber((e.target.checked)) } className="accent-blue-500"/>
        <label for="number" className='text-orange-500'>Number</label>
      </div>
      <div>
        <input type="checkbox" id="character" name="character" value="character" onChange={()=>setcharacter((prev)=!prev)}  className="accent-blue-500"/>
        <label for="character" className='text-orange-500'>Big-Character</label>
      </div>

    </div>
  </div>
    </>
  )
}

export default App
