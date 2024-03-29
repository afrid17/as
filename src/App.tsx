import React, { useEffect, useState } from "react";
import "./App.css";
import users from "./user";
function App() {
  let [allUsers, updateAllUsers] = useState(users)
  let [seeableUsers, updateSeeableUsers] = useState([])
  let [selectedRows, updateSelectedRows] = useState(0)
  let [from, updateFrom] = useState(0)

  let [userClickerd, updateUserClicked] = useState(false)
  function addUser(userId, userName, emailId, mobileNo, address) {
    if (userId === null || userName === null || emailId === null || mobileNo === null || address === null) {
      alert("Please Fill All Fields")
    }
    else {
      if(userId.length >= 5){
        if(userName.length >= 5){
          if(/\S+@\S+\.\S+/.test(emailId)){
            if(/^\d{10}$/.test(mobileNo)){
              if(address.length>=10 ){
                users.unshift({
                  "sno": 0,
                  "userId": userId,
                  "userName": userName,
                  "email": emailId,
                  "mobileNo": mobileNo,
                  "address": address
                })
                users.map((user, index) => {
                  user.sno = index + 1
                })
                updateAllUsers(users)
                updateSelectedRows(2)
                updateFrom(0)
                updateUserClicked(false)

              }
              else{
                alert("please Enter a Valid Address")
              }


            }
            else{
              alert("please Enter a Valid mobile Number")
            }

          }
          else{
            alert("please Enter Valid Email")
          }

        }
        else{
          alert("user Name Should Be 5 Charecters")
        }

      }
      else{
        alert("userId Should Be 5 Charecters")
      }



      

    }
  }
  return (
    userClickerd === true ? <AddUser addUser={addUser} updateUserClicked={updateUserClicked} /> : <HomePage updateAllUsers={updateAllUsers}
      allUsers={allUsers} updateUserClicked={updateUserClicked} from={from} seeableUsers={seeableUsers} selectedRows={selectedRows}
      updateFrom={updateFrom} updateSeeableUsers={updateSeeableUsers} updateSelectedRows={updateSelectedRows} />
  )
}
export default App;


function AddUser({ addUser, updateUserClicked }) {
  let [userId, updateUserId] = useState(null)
  let [userName, updateUserName] = useState(null)
  let [emailId, updateEmailId] = useState(null)
  let [mobileNo, updateMobileNo] = useState(null)
  let [address, updateAddress] = useState(null)
  return (
    <>
      <div className="fixed w-[100vw] h-[100vh ">
        <img src="https://play.tailwindcss.com/img/beams.jpg" className="object-cover w-[100vw] h-[100vh]" />
      </div>
      <main className="w-full relative flex justify-center items-center">
        <div className=" shadowFull w-[80vw] lg:w-[40vw] h-fit flex flex-col justify-center items-center mt-10 pb-10  rounded-lg">
          <div className="w-full flex justify-between items-center pl-[6vw] pr-[2vw] mt-1">
            <div className="flex items-start justify-start mt-[2vh]">
              <label className="text-2xl">User Form</label>
            </div>
            <div onClick={() => {
              updateUserClicked(false)
            }} className=" w-8 h-8 rounded-full border border-zinc-700 text-2xl text-center
          flex items-center justify-center pb-2 mt-2 cursor-pointer">x</div>
          </div>

          <section className=" flex justify-center items-center  h-fit mt-[2vh]">
            <div className="mt-4  flex flex-col space-y-6  pb-10 pl-4 pr-4">
              <TextField value={"User Id"} state={updateUserId} />
              <TextField value={"User Name"} state={updateUserName} />
              <TextField value={"Email Id"} state={updateEmailId} />
              <TextField value={"Mobile No"} state={updateMobileNo} />
              <TextField value={"Address"} state={updateAddress} />
            </div>
          </section>
          <div className="w-full flex items-center text-center justify-center">
            <div onClick={() => {
              addUser(userId, userName, emailId, mobileNo, address)
            }}
              className="h-fit w-fit px-10 py-2 text-lg bg-blue-500 text-white shadow-lg rounded-lg cursor-pointer">Add User</div>
          </div>
        </div>
      </main></>
  )
}
function TextField({ value, state }) {
  return (
    <input onChange={(e) => {
      state(e.target.value)
    }} className="px-6 py-2 pl-4 text-lg border border-zinc-500
    w-full h-fit rounded-lg" type="text" placeholder={value} />
  )
}

function HomePage({ from, updateSelectedRows, updateFrom, selectedRows,
  updateSeeableUsers, seeableUsers, updateUserClicked, allUsers,
  updateAllUsers }) {
  let [searchText, updateSearchText] = useState(null)
  let [totalUsers, updateTotalUsers] = useState(allUsers)
  let [recordData, updateRecordData] = useState([])
  var loopNumber = from

  /**
   * 
   * search function 
   */
  function search() {
    let emptyArray = []
    users.map((user) => {
      if ((user.userName.toLowerCase()).includes(searchText.toLowerCase()) ||
        (user.email.toLowerCase()).includes(searchText.toLowerCase())
        || (user.mobileNo.toLowerCase()).includes(searchText.toLowerCase())) {
        emptyArray.push(user)
      }
    })
    if (emptyArray.length >= 1) {
      updateAllUsers(emptyArray)
      updateFrom(0)
    }
    else {
      alert("Data Not Found")
    }
  }
    /**
     * 
     * next function 
     */
    function next() {
      let emptyArray = []
      loopNumber = from
      if (loopNumber < allUsers.length - selectedRows) {
        while (loopNumber < from + selectedRows && from + selectedRows <= allUsers.length) {
          emptyArray.push(allUsers[loopNumber])
          loopNumber = loopNumber + 1
        }
        updateSeeableUsers(emptyArray)
        updateFrom(from + selectedRows)
      }
      else if (loopNumber < allUsers.length) {
        emptyArray = []
        while (loopNumber < allUsers.length) {
          emptyArray.push(allUsers[loopNumber])
          loopNumber = loopNumber + 1
        }
        updateSeeableUsers(emptyArray)
        updateFrom(from + selectedRows)
      }
    }
  

  /**
     * 
     * previous function 
     */
  function prev() {
    let emptyArray = []
    loopNumber = from - selectedRows - selectedRows //2
    if (loopNumber > -selectedRows) {
      while (loopNumber < from - selectedRows) {
        emptyArray.push(allUsers[loopNumber])
        loopNumber = loopNumber + 1
      }
      updateSeeableUsers(emptyArray)
      updateFrom(from - selectedRows)
    }
  }
/**
 * 
 * get recordNumber
 */
  function getRecordNumber() {
    let emptyArray = []
    let totalRecordsNumber = Math.ceil(totalUsers.length / selectedRows)
    var a = 1
    if (totalRecordsNumber == Infinity) { }
    else {
      while (a <= Number(totalRecordsNumber)) {
        let object = {
          "value": a,
        }
        emptyArray.push(object)
        a = a + 1
      }
    }
    updateRecordData(emptyArray)


  }
  /**
      * 
      * for updating rows in client side 
      */
  function updateselectedrows() {
    let selected = document.getElementById("selectRows") as HTMLSelectElement;
    updateSelectedRows(Number(selected.value))
    updateFrom(0)
  }


/**
 * 
 * update Data when Click On record 
 * 
 */
  function justLogic(value) {
    if(allUsers.length < selectedRows){}
    else{
      let emptyArray = []
    loopNumber = selectedRows * value 
    let a = loopNumber

    if(loopNumber < allUsers.length){
      while (loopNumber-selectedRows  < a ) {
        emptyArray.push(allUsers[loopNumber-selectedRows])
        loopNumber = loopNumber + 1
      }
      updateSeeableUsers(emptyArray)
      updateFrom(a)
    }
    else{
      while (loopNumber-selectedRows  < allUsers.length ) {
        emptyArray.push(allUsers[loopNumber-selectedRows])
        loopNumber = loopNumber + 1
      }
      updateSeeableUsers(emptyArray)
      updateFrom(a)
 
    }
    }
  
  }


  /**
     * 
     *  individual use effect hooks
     */
  useEffect(() => {
    updateselectedrows()
  }, [])
  useEffect(() => {
    getRecordNumber()
    next()
  }, [selectedRows])
  useEffect(() => {
    updateFrom(0)
    next()
  }, [allUsers])

  return (
    <>
      <div className="fixed w-[100vw] h-[100vh ">
        <img src="https://play.tailwindcss.com/img/beams.jpg" className="object-cover w-[100vw] h-[100vh]" />
      </div>
      <main className="flex justify-center">
        <div className="shadowFull rounded-md  w-[94vw] flex flex-col  justify-center relative mt-6">
          <div className="flex justify-between items-start pt-4">
            <div className="flex items-start ml-6  flex-col space-y-4 lg:flex lg:flex-row lg:space-y-0 lg:space-x-6">
              <input onChange={(e) => {
                updateSearchText(e.target.value)
              }} className=" px-3 py-2 w-[50vw] lg:w-[20vw] border border-zinc-500 rounded-lg" placeholder="Search Here" type="text" />
              <div onClick={search
              }
                className="bg-blue-500 w-fit h-fit rounded-lg px-6 py-2 text-lg text-white cursor-pointer">
                Search
              </div>
            </div>
            <div onClick={() => {
              updateUserClicked(true)
            }} className="h-fit w-fit px-2 py-2 text-sm
             rounded-xl border bg-blue-500 text-white font-bold lg:mr-6 cursor-pointer flex justify-center
              items-center lg:text-xl lg:px-10 mr-6 " >
              <a>Add User</a>
            </div>
          </div>
          <div className="mt-6">
            <table className="w-full   ">

              <tr className="w-full justify-between items-center text-center text-lg hidden
                bg-blue-200 p-2  border-b border-zinc-200 lg:flex lg:items-center lg:text-center ">
                <th className="w-1/6">Sno</th>
                <th className="w-1/6">User Id</th>
                <th className="w-1/6">User Name</th>
                <th className="w-1/6">Email Id</th>
                <th className="w-1/6">Mobile No</th>
                <th className="w-1/6">Address</th>
              </tr>

              {seeableUsers.map((user, index) => {
                return (
                  <>
                    <div className="flex   shadow-lg  mt-2 mb-2 m-3 rounded-md lg:shadow-none lg:mt-0 lg:mb-0">
                      <tr key={user} className="lg:hidden flex flex-col text-[10px] font-thin  text-zinc-400
                   p-4 rounded-md border-b border-zinc-200 justify-start items-start
                     text-left w-[40vw]">
                        <th className=" ">Sno : </th>
                        <th className=" ">User Id : </th>
                        <th className=" ">User Name :</th>
                        <th className=" ">Email :</th>
                        <th className=" ">Mobile No :</th>
                        <th className=" ">Address :</th>
                      </tr>

                      <tr key={user} className="w-full text-[10px] lg:text-sm flex flex-col items-cemter justify-center lg:flex lg:flex-row
                     lg:justify-center  lg:items-center text-zinc-600 lg:p-4 rounded-md border-b border-zinc-200 
                     text-left lg:text-center ">
                        <th className="lg:w-1/6 lg:pr-[4vh]">{user.sno}</th>
                        <th className="lg:w-1/6 lg:pr-[2vh] ">{user.userId}</th>
                        <th className="lg:w-1/6 ">{user.userName}</th>
                        <th className="lg:w-1/6 ">{user.email}</th>
                        <th className="lg:w-1/6 ">{user.mobileNo}</th>
                        <th className="lg:w-1/6 ">{user.address}</th>
                      </tr>
                    </div>
                  </>
                );
              })}
            </table>
          </div>
          <div onChange={() => {
            updateselectedrows()
          }} className="flex justify-between items-center p-3">
            <select id="selectRows"
              name="Rows"
              className="border rounded-lg w-1/3 lg:w-1/6 lg:text-xl p-3 text-sm "
            >
              <option value={2}>2 Rows</option>
              <option value={5}>5 Rows</option>
              <option value={10}>10 Rows</option>
              <option value={15}>15 Rows</option>
            </select>
            <div className="flex space-x-3">
              <div className={
                "flex justify-center items-center px-3 h-fit w-fit py-1 rounded-lg border border-blue-300 text-sm cursor-pointer "

              } onClick={() => {
                prev()
              }}>
                <a>Prev</a>
              </div >
              {
                recordData.map((data) => {
                  return <div onClick={() => { justLogic(data.value) }} className="bg-blue-500
                  hidden lg:flex text-white w-8 h-8 rounded-full 
                   items-center justify-center text-center text-sm">{data.value}</div>
                })

              }
              <div id="next" className="flex justify-center items-center px-3 h-fit w-fit py-1 rounded-lg border border-blue-300 text-sm
            cursor-pointer" onClick={() => {
                  next()
                }}>
                <a>Next</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

