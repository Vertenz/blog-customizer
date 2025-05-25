import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [store, setStore] = useState<ArticleStateType>({
		...defaultArticleState,
	});

	const handleSubmit = (values: ArticleStateType) => {
		setStore(values);
	};

	const handleResset = () => {
		setStore({ ...defaultArticleState });
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': store.fontFamilyOption.value,
					'--font-size': store.fontSizeOption.value,
					'--font-color': store.fontColor.value,
					'--container-width': store.contentWidth.value,
					'--bg-color': store.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				params={store}
				handleSubmit={handleSubmit}
				handleReset={handleResset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
