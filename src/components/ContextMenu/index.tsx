import React from 'react';

const ContextMenu = ({ x, y, visible, onClose }: any) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        backgroundColor: 'white',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
        zIndex: 1000,
        borderRadius: '5px',
        width: '250px',
      }}
      onClick={() => onClose()}
    >
      <div className="m-0 cursor-pointer list-none rounded-md p-0 text-sm font-light text-gray-700 hover:bg-gray-200">
        <div
          className="flex cursor-pointer flex-col items-center p-2 hover:bg-gray-200"
          onClick={onClose}
        >
          <div>Lucas Shtorache©</div>
          <div>Todos os direitos reservados.</div>
        </div>
      </div>
    </div>
  );
};

export default ContextMenu;
