import React from 'react';
import AuditDrawer from './AuditDrawer';
import useGraphStore from '../store/useGraphStore';

const AuditDrawerWrapper: React.FC = () => {
  const isOpen = useGraphStore(state => state.auditDrawerOpen);
  const title = useGraphStore(state => state.auditDrawerTitle);
  const content = useGraphStore(state => state.auditDrawerContent);
  const close = useGraphStore(state => state.closeAuditDrawer);

  return (
    <AuditDrawer
      isOpen={isOpen}
      title={title}
      content={content}
      onClose={close}
    />
  );
};

export default AuditDrawerWrapper;
