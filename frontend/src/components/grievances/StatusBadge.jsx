const StatusBadge = ({ status }) => {
  const statusStyles = {
    PENDING: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      )
    },
    RESOLVED: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )
    },
    default: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      icon: null
    }
  };

  const { bg, text, icon } = statusStyles[status] || statusStyles.default;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {status}
    </span>
  );
};

export default StatusBadge;