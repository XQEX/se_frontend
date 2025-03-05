export const API_CONFIG = {
    BASE_URL: 'http://172.188.240.153',
    ENDPOINTS: {
        JOB_SEEKER: {
            REGISTRATION: '/api/user/job-seeker',
            REGISTRATION_IMAGE: '/api/user/job-seeker/registration-image',
            GOOGLE_OAUTH: '/api/user/job-seeker/oauth/google',
            LOGIN: '/api/user/job-seeker/auth',
            INFO: '/api/user/job-seeker/auth',
            LOGOUT: '/api/user/job-seeker/auth',
            PROFILE: '/api/user/job-seeker/profile',
            USERNAME: '/api/user/job-seeker/auth/edit/username',
            PASSWORD: '/api/user/job-seeker/auth/edit/password',
            PROFILE_IMAGE: '/api/user/job-seeker/auth/profile-image',
            JOB_FINDING: '/api/post/job-finding',
            JOB_POSTS: '/api/post/job-finding'
        },
        EMPLOYER: {
            REGISTRATION: '/api/user/employer',
            COMPANY: '/api/user/company',
            LOGIN: '/api/user/employer/auth',
            INFO: '/api/user/employer/auth',
            LOGOUT: '/api/user/employer/auth',
            PROFILE: '/api/user/employer/profile',
            USERNAME: '/api/user/employer/auth/edit/username',
            PASSWORD: '/api/user/employer/auth/edit/password',
            PROFILE_IMAGE: '/api/user/employer/auth/profile-image',
            JOB_POSTS: '/api/post/job-posts/employer'
        },
        MATCHING: {
            FINDING: {
                MATCH: '/api/matching/finding',
                TRACKING: '/api/matching/user/tracking'
            },
            HIRING: {
                MATCH: '/api/matching/hiring'
            }
        },
        NOTIFICATION: {
            LIST: '/api/notification',
            READ: '/api/notification',
            READ_ALL: '/api/notification/mark-all-read'
        },
        SKILLS: {
            LIST: '/api/skill',
            CREATE: '/api/skill',
            GET: '/api/skill',
            UPDATE: '/api/skill',
            DELETE: '/api/skill'
        },
        JOB_CATEGORIES: {
            LIST: '/api/category',
            CREATE: '/api/category',
            GET: '/api/category',
            UPDATE: '/api/category',
            DELETE: '/api/category'
        },
        ADMIN: {
            INFO: '/api/admin/auth',
            APPROVALS: '/api/admin/approve',
            GENERATE: '/api/admin',
            LOGIN: '/api/admin/auth',
            LOGOUT: '/api/admin/auth',
            APPROVE: '/api/admin/approve'
        },
        VULNERABILITY: {
            LIST: '/api/vulnerability',
            CREATE: '/api/vulnerability',
            GET: '/api/vulnerability',
            UPDATE: '/api/vulnerability',
            DELETE: '/api/vulnerability'
        }
    }
}; 