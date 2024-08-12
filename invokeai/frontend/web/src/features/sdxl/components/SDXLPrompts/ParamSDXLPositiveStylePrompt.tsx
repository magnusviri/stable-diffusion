import { Box, Textarea } from '@invoke-ai/ui-library';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { positivePrompt2Changed } from 'features/controlLayers/store/controlLayersSlice';
import { PromptLabel } from 'features/parameters/components/Prompts/PromptLabel';
import { PromptOverlayButtonWrapper } from 'features/parameters/components/Prompts/PromptOverlayButtonWrapper';
import { AddPromptTriggerButton } from 'features/prompt/AddPromptTriggerButton';
import { PromptPopover } from 'features/prompt/PromptPopover';
import { usePrompt } from 'features/prompt/usePrompt';
import { memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export const ParamSDXLPositiveStylePrompt = memo(() => {
  const dispatch = useAppDispatch();
  const prompt = useAppSelector((s) => s.controlLayers.present.positivePrompt2);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useTranslation();
  const handleChange = useCallback(
    (v: string) => {
      dispatch(positivePrompt2Changed(v));
    },
    [dispatch]
  );
  const { onChange, isOpen, onClose, onOpen, onSelect, onKeyDown } = usePrompt({
    prompt,
    textareaRef: textareaRef,
    onChange: handleChange,
  });

  return (
    <PromptPopover isOpen={isOpen} onClose={onClose} onSelect={onSelect} width={textareaRef.current?.clientWidth}>
      <Box pos="relative">
        <Textarea
          id="prompt"
          name="prompt"
          ref={textareaRef}
          value={prompt}
          onChange={onChange}
          onKeyDown={onKeyDown}
          fontSize="sm"
          variant="darkFilled"
          minH={24}
          paddingRight={10}
          paddingLeft={3}
          paddingTop={7}
          paddingBottom={3}
        />
        <PromptOverlayButtonWrapper>
          <AddPromptTriggerButton isOpen={isOpen} onOpen={onOpen} />
        </PromptOverlayButtonWrapper>
        <PromptLabel label={t('sdxl.posStylePrompt')} />
      </Box>
    </PromptPopover>
  );
});

ParamSDXLPositiveStylePrompt.displayName = 'ParamSDXLPositiveStylePrompt';
