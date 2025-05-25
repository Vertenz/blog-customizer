import { useState, useEffect, useRef } from 'react';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	containerRef: React.RefObject<HTMLElement>;
}

export const ArticleParamsForm = ({ containerRef }: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !formRef.current?.contains(target)) {
				setIsMenuOpen(false);
			}
		};

		window.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const asideStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isMenuOpen,
	});

	const handleButtonClick = () => {
		setIsMenuOpen((currentValue) => !currentValue);
	};

	const setStyles = (): void => {
		if (!containerRef.current) return;

		const style = containerRef.current.style;
		style.setProperty('--font-family', fontFamily.value);
		style.setProperty('--font-size', fontSize.value);
		style.setProperty('--font-color', fontColor.value);
		style.setProperty('--container-width', contentWidth.value);
		style.setProperty('--bg-color', backgroundColor.value);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setStyles();
	};

	const onReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);

		if (!containerRef.current) return;
		const style = containerRef.current.style;
		style.setProperty(
			'--font-family',
			defaultArticleState.fontFamilyOption.value
		);
		style.setProperty('--font-size', defaultArticleState.fontSizeOption.value);
		style.setProperty('--font-color', defaultArticleState.fontColor.value);
		style.setProperty(
			'--container-width',
			defaultArticleState.contentWidth.value
		);
		style.setProperty('--bg-color', defaultArticleState.backgroundColor.value);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleButtonClick} />
			<aside ref={formRef} className={asideStyle}>
				<form onSubmit={onSubmit} onReset={onReset} className={styles.form}>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={setFontFamily}
					/>

					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						name='fontSizeOption'
						selected={fontSize}
						onChange={setFontSize}
					/>

					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={fontColor}
						onChange={setFontColor}
					/>

					<div className={styles.separator}></div>

					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={backgroundColor}
						onChange={setBackgroundColor}
					/>

					<Select
						title='ширина контейнера'
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
