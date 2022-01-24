const abrirMenuLateral = document.querySelector('.btn-menu-fechado')
const textoMenu = document.querySelectorAll('.txt-icone')
const galeria = document.querySelectorAll('.item-galeria')
const likeFotoModal = document.querySelector('.like-modal')
const modal = document.querySelector('.modal')
const fotoModal = modal.querySelector('.img-modal')
const next = document.querySelector('.proximo img')
const prev = document.querySelector('.anterior img')
let navIndex = 0

function checarSetas(index) {
	navIndex = index
	if (index === 0 || navIndex === 0) {
		addEscondido(prev);
		removerEscondido(next)
	} else if (index === galeria.length - 1 || navIndex === galeria.length - 1) {
		addEscondido(next)
		removerEscondido(prev)
	} else {
		removerEscondido(prev)
		removerEscondido(next)
	}
}

function removerEscondido(itens) {
	itens.classList.remove('fechado')
}

function addEscondido(itens) {
	itens.classList.add('fechado')
}

function likeNasFotos(item) {
	likeFotoModal.classList.toggle('fechado');
	galeria.forEach(item => {
		const foto = item.querySelector('.item-imagem')
		if (fotoModal.src === foto.src) {
			const like = item.querySelector('.item-like')
			like.classList.toggle('fechado')
		}
	})
}

function likeBackground(item) {
	const curtida = modal.querySelector('.like-modal');
	const likeFoto = item.querySelector('.item-like')
	if (!likeFoto.className.includes('fechado')) {
		removerEscondido(curtida);
	} else {
		addEscondido(curtida)
	}
}

abrirMenuLateral.addEventListener('click', () => {
	if (abrirMenuLateral.getAttribute("src") === "./assets/closed-menu.svg") {
		abrirMenuLateral.src = "./assets/open-menu.svg";
		textoMenu.forEach(item => {
			removerEscondido(item);
		})
	} else {
		abrirMenuLateral.src = "./assets/closed-menu.svg"
		textoMenu.forEach(item => {
			addEscondido(item);
		})
	}
})

galeria.forEach((item, index) => {
	const img = item.querySelector('.item-imagem')
	img.addEventListener('click', (e) => {
		fotoModal.src = e.target.src;
		modal.classList.remove('fechado')
		likeBackground(item);
		checarSetas(index)
	})
})

const fechar = document.querySelector('.fechar');
fechar.addEventListener('click', () => {

	if (modal.className.includes('fechado')) {
		modal.classList.remove('fechado')
	} else {
		modal.classList.add('fechado')
	}
})

fotoModal.addEventListener('dblclick', (e) => {
	likeNasFotos(e.target)
})

next.addEventListener('click', () => {
	navIndex++
	const img = galeria[navIndex].querySelector('.item-imagem')
	fotoModal.src = img.src
	checarSetas(navIndex)
	likeBackground(galeria[navIndex])
})

prev.addEventListener('click', () => {
	navIndex--
	const img = galeria[navIndex].querySelector('.item-imagem')
	fotoModal.src = img.src
	checarSetas(navIndex)
	likeBackground(galeria[navIndex])
})