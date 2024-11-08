import { Combobox, FormControl, FormLabel } from '@invoke-ai/ui-library';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { useModelCombobox } from 'common/hooks/useModelCombobox';
import { clipGEmbedModelSelected, selectCLIPGEmbedModel } from 'features/controlLayers/store/paramsSlice';
import { zModelIdentifierField } from 'features/nodes/types/common';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useCLIPEmbedModels } from 'services/api/hooks/modelsByType';
import type { CLIPGEmbedModelConfig } from 'services/api/types';
import { isCLIPGEmbedModelConfig } from 'services/api/types';

const ParamCLIPEmbedModelSelect = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const clipEmbedModel = useAppSelector(selectCLIPGEmbedModel);
  const [modelConfigs, { isLoading }] = useCLIPEmbedModels();

  const _onChange = useCallback(
    (clipEmbedModel: CLIPGEmbedModelConfig | null) => {
      if (clipEmbedModel) {
        dispatch(clipGEmbedModelSelected(zModelIdentifierField.parse(clipEmbedModel)));
      }
    },
    [dispatch]
  );

  const { options, value, onChange, noOptionsMessage } = useModelCombobox({
    modelConfigs: modelConfigs.filter((config) => isCLIPGEmbedModelConfig(config)),
    onChange: _onChange,
    selectedModel: clipEmbedModel,
    isLoading,
  });

  return (
    <FormControl isDisabled={!options.length} isInvalid={!options.length} minW={0} flexGrow={1}>
      <FormLabel m={0}>{t('modelManager.clipGEmbed')}</FormLabel>
      <Combobox value={value} options={options} onChange={onChange} noOptionsMessage={noOptionsMessage} />
    </FormControl>
  );
};

export default memo(ParamCLIPEmbedModelSelect);