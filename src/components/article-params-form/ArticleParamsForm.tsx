import { useLayoutEffect, useState } from 'react';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	params: ArticleStateType;
	handleSubmit: (values: ArticleStateType) => void;
	handleReset: () => void;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(props.params.fontFamilyOption);
	const [fontSize, setFontSize] = useState(props.params.fontSizeOption);
	const [fontColor, setFontColor] = useState(props.params.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		props.params.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(props.params.contentWidth);

	useLayoutEffect(() => {
		setFontFamily(props.params.fontFamilyOption);
		setFontSize(props.params.fontSizeOption);
		setFontColor(props.params.fontColor);
		setBackgroundColor(props.params.backgroundColor);
		setContentWidth(props.params.contentWidth);
	}, [props.params]);

	const asideStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	const handleButtonClick = () => {
		setIsOpen((currentValue) => !currentValue);
	};

	const getValues = (): ArticleStateType => ({
		fontFamilyOption: fontFamily,
		fontSizeOption: fontSize,
		fontColor: fontColor,
		backgroundColor: backgroundColor,
		contentWidth: contentWidth,
	});

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		props.handleSubmit(getValues());
	};

	const onReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		props.handleReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleButtonClick} />
			<aside className={asideStyle}>
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
						name='fontSizeOption '
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
