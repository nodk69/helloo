import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { formatDate } from '../../utills/helpers';
import { useGetGrievanceByIdQuery } from '../../api/grievancesApi';

const GrievanceCard = ({ grievance }) => {
  const { data: detailedGrievance } = useGetGrievanceByIdQuery(grievance.id, {
    skip: !grievance.id
  });

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              <Link to={`/grievances/${grievance.id}`} className="hover:text-indigo-600">
                {grievance.title}
              </Link>
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {grievance.description}
            </p>
          </div>
          <StatusBadge status={grievance.status} />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Created: {formatDate(grievance.createdAt)}</span>
            {detailedGrievance?.userApprovedResolution && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                Approved
              </span>
            )}
          </div>

          <Link 
            to={`/grievances/${grievance.id}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GrievanceCard;