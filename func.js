document.addEventListener('DOMContentLoaded', function () {
    const accessBoxes = document.querySelectorAll('.access-box');
    const recentAccess = document.querySelector('.recent-access');
    const prevButton = document.getElementById('scrollLeft');
    const nextButton = document.getElementById('scrollRight');
    
    /*Adicionar evento de clique para seleção dos documentos*/
    accessBoxes.forEach(box => {
        box.addEventListener('click', function () {
            accessBoxes.forEach(b => b.classList.remove('selected'));
            box.classList.add('selected');
        });
    });

    /*Função para mover o slide para a esquerda*/
    prevButton.addEventListener('click', function () {
        recentAccess.scrollBy({
            left: -150,
            behavior: 'smooth'
        });
        highlightCurrentBox();
    });

    /*Função para mover o slide para a direita*/
    nextButton.addEventListener('click', function () {
        recentAccess.scrollBy({
            left: 150,
            behavior: 'smooth'
        });
        highlightCurrentBox();
    });

    /*Função para destacar o quadrado ativo*/
    function highlightCurrentBox() {
        accessBoxes.forEach(box => box.classList.remove('selected'));
        let currentScroll = recentAccess.scrollLeft;
        let activeIndex = Math.round(currentScroll / 210);
        accessBoxes[activeIndex]?.classList.add('selected');
    }
});
