const BLOCK_REGEXP = /^[\w\d]+$/;
const ELEMENT_REGEXP = /^[\w\d]+__[\w\d]+$/;

/**
 * Установить модификатор у блока или элемента
 * @param  {DOM.Element} node
 * @param  {String}      mod  modifier name
 * @return {DOM.Element} current DOM element
 */
export const setMod = (node, mod) => {
	const className = getFirstBemClass(node);
	node.classList.add(`${className}_${mod}`);
	return node;
}

/**
 * Сбросить модификатор у блока или элемента
 * @param  {DOM.Element} node
 * @param  {String}      mod  modifier name
 * @return {DOM.Element} current DOM element
 */
export const unsetMod = (node, mod) => {
	const className = getFirstBemClass(node);
	node.classList.remove(`${className}_${mod}`);
	return node;
}

/**
 * Переключить модификатор у блока или элемента
 * @param  {DOM.Element} node
 * @param  {String}      mod  modifier name
 * @return {DOM.Element} current DOM element
 */
export const toggleMod = (node, mod) => {
	const className = getFirstBemClass(node);
	node.classList.toggle(`${className}_${mod}`);
	return node;
}

/**
 * Вернуть первый класс
 * @param  {DOM.Element} node
 * @return {String}      className
 */
export const getFirstBemClass = (node) => node.classList[0]

/**
 * Проверка является ли узел блоком
 * @param  {DOM.Element} node
 * @return {Boolean}     
 */
export const isBlock = (node) => {
	let firstClass = getFirstBemClass(node);
	return !!firstClass.match(BLOCK_REGEXP);
}

/**
 * Проверка является ли узел элементом 
 * @param  {DOM.Element} node
 * @return {Boolean}     
 */
export const isElement = (node) => {
	let firstClass = getFirstBemClass(node);
	return !!firstClass.match(ELEMENT_REGEXP);
}