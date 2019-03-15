import applyQuery from './query-applier';

export default (paths = [], param = '', values = []) => {

	let optional = false;

	if (param.substring(param.length - 1, param.length) === '?') {
		optional = true;
		param = param.substring(0, param.length - 1);
		param += '\\?';
	}

	const query = new RegExp('/:' + param);

	values = Array.isArray(values) ? values : [values];
	values = values.map(value => '/' + value);

	if (optional) {
		values.unshift('');
	}

	return (
		values
			.map(value => applyQuery(paths, query, value))
			.reduce((result, path) => result.concat(path))
	);

};
