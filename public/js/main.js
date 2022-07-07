const deleteText = document.querySelectorAll('.fa-trash')


Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteCar)
})


async function deleteCar(){
    const sNum = this.parentNode.childNodes[7].innerText
    console.log(sNum)
    try{
        const response = await fetch('deleteCar', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'spotNumber': sNum,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
