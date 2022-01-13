import Card from "../UI/Card";
const Welcome = () =>{
   return(
       <div style={{
           display: "flex",
           padding:'2em'
       }}>
           <div style={{    
               width: '110%'}}>
              <Card>
              Hi, this is your option to make order in your time and task, <br/>
              make sure that you don't miss anything and make the best of you can!  <br/>
              You can add your tasks with limited date, urgency and more! <br/>
              </Card>
           </div>
           <div >
              <img src="diary.png" 
              style={{
                borderRadius: 20,
                height: '75%',
                width: '75%'
               }} />
           </div>
       </div>
   )
};

export default Welcome;