import { Mail, MapPin, CalendarPlus, BriefcaseBusiness, Cake } from 'lucide-react'
import React from 'react'
import { formatDate } from '../../utils/CommonFunctions'

function ProfileDetails({user}) {
  return (
    <div className="profile-details-list">
        {Object.entries({
            'Profession': { icon: <BriefcaseBusiness />, value: user?.profession || '-'},
            'E-mail': { icon: <Mail />, value: user?.email },
            'Date of Birth': { icon: <Cake />, value: formatDate(user?.dateOfBirth) || '-' },
            'Member Since': { icon: <CalendarPlus />,  value: formatDate(user?.createdAt) },
            Neighborhood: { icon: <MapPin />, value: `${user?.neighborhood.name}, ${user?.neighborhood.city} - ${user?.neighborhood.state}` , fullWidth: true },
        }).map(([label, data], index) => (
            <div className="detail-item" key={label} style={{ animationDelay: `${index * 100}ms`, gridColumn: data.fullWidth ? '1 / -1' : 'auto' }}>
                <div className="detail-icon">{data.icon}</div>
                <div>
                    <div className="detail-label">{label}</div>
                    <div className="detail-value">{data.value}</div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default ProfileDetails