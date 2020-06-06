function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res =>  res.json())
    .then( states => {

        for( const state of states){

            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )

}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInputt = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInputt.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value> Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (res) => { return res.json() }) // padrão
    .then( cities => {

        for( const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )

}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)

// Itens de Coleta

const itensToCollect = document.querySelectorAll(".itens-grid li")

for(const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=itens]")


let selectedItens = []

function handleSelectedItem(event) {
    
    const itemLi = event.target

    // Add or remove a javascript class
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    console.log('ITEM ID: ', itemId)

    // Verificar se existem itens selecionados
    // Pega os itens selecionados

    const alreadySelected = selectedItens.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })

    // se já estiver selecionado, tirar da selecao
    if(alreadySelected >= 0){
        // tirar da seleção
        const filteredItens = selectedItens.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItens = filteredItens
    } else{
        //se não estiver selecionado, adcionar a seleção
        selectedItens.push(itemId)

    }

    console.log('SelectedItens: ', selectedItens)

    //atualizar o campo escondido com os dados selecionados
    collectedItens.value = selectedItens
}
