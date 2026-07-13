import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/app/hooks';
import { addToast } from '@/features/ui/uiSlice';
import { getGraphQLErrorMessage } from '@/services/graphql/client';
import {
  useDeleteAlertMutation,
  useToggleAlertMutation,
} from '@/services/api/alertsApi';
import { Button } from '@/shared/ui/Button';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog';
import { AlertForm } from './AlertForm';
import type { Alert } from './alert.types';
import {
  ItemRow,
  Info,
  Symbol,
  ConditionBadge,
  TargetPrice,
  StatusBadge,
  TriggeredAt,
  Actions,
} from './AlertListItem.styles';

const formatTime = (isoDate: string) =>
  new Date(isoDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const AlertListItem = ({ alert }: { alert: Alert }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const [toggleAlert, { isLoading: isToggling }] = useToggleAlertMutation();
  const [deleteAlert, { isLoading: isDeleting }] = useDeleteAlertMutation();

  const showError = (err: unknown) => {
    dispatch(
      addToast(getGraphQLErrorMessage(err) ?? t('alerts.errors.generic'), 'error'),
    );
  };

  const handleToggle = async () => {
    try {
      await toggleAlert(alert.id).unwrap();
    } catch (err) {
      showError(err);
    }
  };

  const handleConfirmDelete = async () => {
    setIsConfirmingDelete(false);

    try {
      await deleteAlert(alert.id).unwrap();
    } catch (err) {
      showError(err);
    }
  };

  if (isEditing) {
    return (
      <ItemRow>
        <AlertForm alert={alert} onDone={() => setIsEditing(false)} />
      </ItemRow>
    );
  }

  return (
    <ItemRow>
      <Info>
        <Symbol>{alert.symbol}</Symbol>
        <ConditionBadge>{t(`alerts.condition.${alert.condition}`)}</ConditionBadge>
        <TargetPrice>{alert.targetPrice}</TargetPrice>
        <StatusBadge variant={alert.enabled ? 'active' : 'disabled'}>
          {alert.enabled ? t('alerts.statusActive') : t('alerts.statusDisabled')}
        </StatusBadge>
        {alert.triggeredAt && (
          <TriggeredAt>
            {t('alerts.triggeredAt', { time: formatTime(alert.triggeredAt) })}
          </TriggeredAt>
        )}
      </Info>

      <Actions>
        <Button
          size="sm"
          variant="ghost"
          isLoading={isToggling}
          onClick={handleToggle}
        >
          {alert.enabled ? t('alerts.disable') : t('alerts.enable')}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
          {t('alerts.edit')}
        </Button>
        <Button
          size="sm"
          variant="danger"
          isLoading={isDeleting}
          onClick={() => setIsConfirmingDelete(true)}
        >
          {t('alerts.delete')}
        </Button>
      </Actions>

      <ConfirmDialog
        open={isConfirmingDelete}
        message={t('alerts.confirmDelete')}
        confirmLabel={t('alerts.delete')}
        cancelLabel={t('alerts.cancel')}
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmingDelete(false)}
      />
    </ItemRow>
  );
};
