import { about } from '../../../mocks/data';
// Данные запрошенные из top-level +layout.server.ts будут доступны во всех компонентах по иерархии ниже
export function load() {
	return {
		navigation: about.map(({ slug, title }) => ({ slug, title }))
	};
}
