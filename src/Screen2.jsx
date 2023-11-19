import React,{useState,useEffect} from 'react'
import "./Screen2.css"
import Axios from 'axios';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis} from 'recharts'
import { useData } from './DataContext';
let Screen2 = () => {
    const [dataObj,setDataObj]=useState({});
    const [dataAmount,setDataAmount]=useState({});
    const [isChecked, setIsChecked] = useState(true);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);

    const { id } = useData();
  
  
 
    const fetchData = async() => {
      
      try {
        const output = await Axios.get(`https://stg.dhunjam.in/account/admin/${id}`);
        setDataObj(output.data.data);
        setDataAmount({ ...output.data.data.amount });
        setIsChecked(output.data.data.charge_customers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      
    };
  
    const saveChanges = async () => {
      try {
        // Make PUT request to update prices
        await Axios.put(`https://stg.dhunjam.in/account/admin/${id}`, { amount: dataAmount });
        fetchData();
       
      } catch (error) {
        console.error('Error updating prices:', error);
      }
    };
    
      useEffect(()=>{
        fetchData();
      },[])

      useEffect(() => {
       
       if (dataObj.amount) {
        setDataAmount({ ...dataObj.amount });
         }
        
      }, [dataObj.amount]);
      

      useEffect(()=>{
        setIsChecked(dataObj.charge_customers);
      },[dataObj.charge_customers])
      
      useEffect(() => {
        
        const isHigherThanValues =
          dataAmount.category_6 > 99 &&
          dataAmount.category_7 > 79 &&
          dataAmount.category_8 > 59 &&
          dataAmount.category_9 > 39 &&
          dataAmount.category_10 > 19;
    
        setIsSaveEnabled(isHigherThanValues);
      }, [dataAmount]); 

      const recordChanges=(event)=>{
      
       setDataAmount((prevDataAmount) => ({
        ...prevDataAmount,
        [event.target.name]: event.target.value,
    }));
      }
      const data =[
        {name :"Custom" , value : dataAmount.category_6},
        {name :"Category 1" , value : dataAmount.category_7},
        {name :"Category 2" , value : dataAmount.category_8},
        {name :"Category 3" , value : dataAmount.category_9},
        {name :"Category 4" , value : dataAmount.category_10}
      ]
      const toggleIsChecked = () => {
        setIsChecked(!isChecked);
      }
      
  return (
    
    <div className='card2'>
    <div className='heading2'>{dataObj.name}, {dataObj.location} on Dhun Jam</div>
    <div className='grid-container'>
        <div class="grid-item">Do you want to charge your customers for requesting songs?</div>
        <div class="grid-container2">
            <div class="radio-group">
            <input type="radio" checked={isChecked} id="radio1" name="group" value="yes" onChange={toggleIsChecked}/>
            <label for="radio1" class="radio-label">Yes</label>
            </div>

            <div class="radio-group">
            <input type="radio" checked={!isChecked} id="radio2" name="group" value="no" onChange={toggleIsChecked}/>
            <label for="radio2" class="radio-label">No</label>
            </div>
        </div>
        <div className="grid-item">Custom song request amount</div>  
        <div className="grid-item"><input disabled={!isChecked} id="custom" type="number" name="category_6" onChange={(e)=>{recordChanges(e)}} value={dataAmount.category_6 || ''}/></div>
        <div className="grid-item">Regular song request amount from high to low-</div>
        <div className="grid-item amount">
        <input  type="number" disabled={!isChecked} onChange={(e)=>{recordChanges(e)}} name="category_7" value={dataAmount.category_7 || ''} />
        <input type="number"  disabled={!isChecked} onChange={(e)=>{recordChanges(e)}} name="category_8" value={dataAmount.category_8 || ''} />
        <input type="number"  disabled={!isChecked} onChange={(e)=>{recordChanges(e)}} name="category_9" value={dataAmount.category_9 || ''}/>
        <input type="number"  disabled={!isChecked} onChange={(e)=>{recordChanges(e)}} name="category_10" value={dataAmount.category_10 || ''}/>
        </div>
    </div>

    {isChecked && (
        <div>
          <ResponsiveContainer aspect={2}>
            <BarChart data={data}>
              <XAxis dataKey="name" style={{ fill: '#FFFFFF' }} />
              <YAxis tick={null} />
              <Bar dataKey="value" fill="#F0C3F1" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    <button disabled={!isChecked || !isSaveEnabled} onClick={saveChanges} className='save'>Save</button>
    </div>
  )
}    


export default Screen2;
