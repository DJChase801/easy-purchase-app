// STORE
import React, { useContext, createContext } from 'react';
import { destroy } from 'mobx-state-tree';
import _get from 'lodash/get';

// Store Imports
import { AppStoreModel } from './app.store';

const AppStore = AppStoreModel.create();

// initial values
export const rootStore = {
	AppStore,
};

// Context
export const StoreContext = createContext(null);

// Hook
export function useStores() {
	return useContext(StoreContext);
}

export const ModelConnector = (WrappedComponent, models, isTestModel = false) => {
	return class extends React.Component {
		constructor(props) {
			super(props);
			const modelProps = {};
			for (const modelName in models) {
				if (Object.hasOwnProperty.call(models, modelName)) {
					const modelObject = models[modelName];
					if (isTestModel) {
						modelProps[modelName] = modelObject;
					} else {
						modelProps[modelName] = createNewModelWithProps(modelObject, props);
					}
				}
			}
			this.modelProps = modelProps;
		}

		shouldComponentUpdate(nextProps) {
			for (const model in this.modelProps) {
				this.modelProps[model].updateProps(nextProps);
			}
			return true;
		}

		componentWillUnmount() {
			for (const model in this.modelProps) {
				// make sure the state tree is cleaned up to prevent memory leaks when component unmounts
				destroy(this.modelProps[model]);
			}
		}

		render() {
			return (
				<WrappedComponent {...this.modelProps} {...this.props} />
			);
		}
	};
};

function createNewModelWithProps(modelObject, props) { // this is necessary for the models to get updated props
	const { model, initialValues = {}, stores = rootStore } = modelObject;
	const newModel = model
		.views((self) => ({
			get t() {
				const t = _get(self, 'props.t', () => { });
				return t;
			},
		}))
		.volatile(() => ({
			props,
		}))
		.actions(self => ({
			updateProps(nextProps) {
				self.props = nextProps;
			},
		}));

	if (props.savedPropsToState) {
		for (const p in props.savedPropsToState) {
			initialValues[p] = props.savedPropsToState[p];
		}
	}

	const initiatedModel = newModel.create(initialValues, stores);
	return initiatedModel;
}
