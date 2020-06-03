/* Begin Dados da entidade */
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);
/* End Dados da entidade */

/* Begin Ítens de coleta */
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (item of itemsToCollect) {
    item.addEventListener("click", handdleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handdleSelectedItem(event) {
    const itemLi = event.target

    //Adicionar ou remover uma classe
    itemLi.classList.toggle("selected");
    
    const itemId = event.target.dataset.id;
    //Verificar itens selecionados, se sim, pegar os intens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId; //retornará true ou false
        return itemFound;
    })
    //Se já estiver selecionado
    if (alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent;
        })

        selectedItems = filteredItems;
    } else {
        //Se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId);
    }

    //Atualizar o input hidden com os itens selecionados
    collectedItems.value = selectedItems;
}
/* End Ítens de coleta */
