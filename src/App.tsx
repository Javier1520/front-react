import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import Button from '@/components/Button'
import Box from '@/components/Box'
import JoinUsBox from '@/components/JoinUsBox'
import LoginForm from '@/components/LoginForm'
import RegistrationForm from '@/components/RegistrationForm'
import MyAccountList from '@/components/MyAccountList'
import Table from '@/components/Table'
import MiniProfile from '@/components/MiniProfile'
import ModalBox from '@/components/ModalBox'
import DatePickerField from '@/components/DatePickerField'
import ToasterProvider, {
  toastSuccess,
  toastError,
  toastInfo,
  toastWarning,
} from '@/components/Toaster'
import type { UserProfile } from '@/components/MyAccountList'
import type { NavItem } from '@/components/Navigation'

const APP_CRUMBS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'profile', label: 'My Profile', href: '/profile' },
]

const TABLE_COLUMNS = [
  { field: 'date', headerName: 'Date', flex: 1 },
  { field: 'trainerName', headerName: 'Trainer Name', flex: 1 },
  { field: 'type', headerName: 'Training Type', flex: 1 },
  { field: 'studentName', headerName: 'Student Name', flex: 1 },
  { field: 'duration', headerName: 'Duration (mins)', flex: 1 },
]

const TABLE_DATA = [
  { date: '2026-06-15', trainerName: 'Sarah Jenkins', type: 'Yoga Flow', studentName: 'Alice Smith', duration: 60 },
  { date: '2026-06-14', trainerName: 'Mike Ross', type: 'CrossFit WOD', studentName: 'Bob Johnson', duration: 45 },
  { date: '2026-06-12', trainerName: 'Emma Watson', type: 'Pilates Reformer', studentName: 'Clara Oswald', duration: 50 },
  { date: '2026-06-10', trainerName: 'David Tennant', type: 'Strength Basics', studentName: 'Donna Noble', duration: 60 },
]

const INITIAL_PROFILE: UserProfile = {
  firstName: 'Javier',
  lastName: 'Gomez',
  username: 'javier_15',
  email: 'javier.gomez@gmail.com',
  dateOfBirth: '1995-10-12',
  address: '123 Premium Way, Tech City',
  isActive: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_PROFILE)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedDemoDate, setSelectedDemoDate] = useState<Date | null>(new Date())
  const [activeNavId, setActiveNavId] = useState('profile')

  const handleSignIn = () => {
    setIsAuthenticated(true)
    toastSuccess('Signed in successfully!')
  }

  const handleSignOut = () => {
    setIsAuthenticated(false)
    toastInfo('Signed out successfully.')
  }

  const handleProfileSave = (updated: UserProfile) => {
    setUserProfile(updated)
    toastSuccess('Profile updated successfully!')
  }

  const handleDeleteProfile = () => {
    setShowDeleteModal(false)
    setIsAuthenticated(false)
    toastError('Profile has been deleted (Simulated).')
  }

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { id: 'profile', label: 'My Profile', href: '/profile' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 flex flex-col">
      {/* Toast notifications container */}
      <ToasterProvider />

      {/* Header component */}
      <Header
        navItems={navItems}
        activeNavItemId={activeNavId}
        onNavItemClick={(item) => {
          setActiveNavId(item.id)
          toastInfo(`Navigated to ${item.label}`)
        }}
        isAuthenticated={isAuthenticated}
        onSignIn={handleSignIn}
        onJoinUs={() => toastInfo('Join Us clicked!')}
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12">

        {/* Top bar with Breadcrumbs & Auth actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <Breadcrumbs crumbs={APP_CRUMBS} />

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                  onClick={() => setShowProfileModal(true)}
                >
                  <img
                    src={userProfile.avatarUrl}
                    alt="avatar"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold">{userProfile.firstName}</span>
                </button>

                {/* Hover dropdown or overlay panel for MiniProfile */}
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-1">
                  <MiniProfile
                    avatarUrl={userProfile.avatarUrl}
                    firstName={userProfile.firstName}
                    lastName={userProfile.lastName}
                    email={userProfile.email}
                    onMyAccountClick={() => {
                      toastInfo('Navigating to account page...')
                      setShowProfileModal(true)
                    }}
                    onSignOutClick={handleSignOut}
                  />
                </div>
              </div>
            ) : (
              <Button label="Quick Auth" variant="secondary" onClick={handleSignIn} />
            )}

            <Button
              label="Trigger Toast Info"
              variant="important"
              onClick={() => toastInfo('This is a helpful information toast!')}
            />
          </div>
        </div>

        {/* Section 1: Primitive Components & Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-l-4 border-brand-500 pl-3">
            Primitive Components & Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box component 1 */}
            <Box
              tag="HEALTH & FITNESS"
              title="10 Core Routines to Elevate Your Daily Morning Yoga Workouts"
              date="Jun 15, 2026"
              timeToRead="7 mins read"
              imageUrl="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400"
              imageAlt="Yoga meditation"
              onClick={() => toastInfo('Blog article clicked!')}
            />

            {/* Box component 2 */}
            <Box
              tag="STRENGTH"
              title="Understanding Hypertrophy: How to Build Muscle Safely"
              date="May 28, 2026"
              timeToRead="12 mins read"
              imageUrl="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400"
              imageAlt="Gym weights"
              onClick={() => toastInfo('Blog article clicked!')}
            />

            {/* JoinUsBox components */}
            <div className="flex flex-col gap-4">
              <JoinUsBox
                role="Student"
                description="Gain access to thousands of structured training plans, track progress, and communicate directly with licensed coaches."
                onJoin={() => toastSuccess('Student register flow selected!')}
              />
              <JoinUsBox
                role="Trainer"
                description="Publish your own training courses, manage client schedules, and build your digital athletic coaching business."
                onJoin={() => toastSuccess('Trainer register flow selected!')}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Form Demos */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-l-4 border-brand-500 pl-3">
            Form Components
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Login form */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Sign In Form</h3>
              <LoginForm
                onSubmit={async (values) => {
                  toastSuccess(`Logged in as ${values.username}`);
                  setIsAuthenticated(true);
                }}
              />
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-2">
              <RegistrationForm
                onSubmit={async (role, values) => {
                  toastSuccess(`Successfully registered as a ${role}!`);
                  return {
                    username: `${values.firstName.toLowerCase()}_${values.lastName.toLowerCase()}_26`,
                    password: 'TemporaryPassword123!',
                  };
                }}
              />
            </div>
          </div>
        </section>

        {/* Section 3: Profile management */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-l-4 border-brand-500 pl-3">
            Account Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4">Interactive Profile Form</h3>
              <MyAccountList
                profile={userProfile}
                onSave={handleProfileSave}
              />
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4">Static MiniProfile Preview</h3>
                <div className="flex justify-center">
                  <MiniProfile
                    avatarUrl={userProfile.avatarUrl}
                    firstName={userProfile.firstName}
                    lastName={userProfile.lastName}
                    email={userProfile.email}
                    onMyAccountClick={() => setShowProfileModal(true)}
                    onSignOutClick={handleSignOut}
                  />
                </div>
              </div>

              {/* Toast showcase */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Toast Notifications</h3>
                <p className="text-sm text-slate-500">Test the react-toastify integration overlay:</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button label="Success Toast" variant="primary" onClick={() => toastSuccess('Action completed successfully!')} />
                  <Button label="Error Toast" variant="important" onClick={() => toastError('An error occurred. Please try again.')} />
                  <Button label="Warning Toast" variant="secondary" onClick={() => toastWarning('Warning: Low storage limits!')} />
                  <Button label="Info Toast" variant="secondary" onClick={() => toastInfo('Info: You have a new notification')} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Data grids & datepickers */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-l-4 border-brand-500 pl-3">
            AG Grid & Custom Inputs
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Left selector */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Custom Date Picker</h3>
              <DatePickerField
                id="demo-datepicker"
                label="Select Training Session Date"
                selected={selectedDemoDate}
                onChange={(date) => {
                  setSelectedDemoDate(date)
                  toastInfo(`Selected Date: ${date?.toLocaleDateString()}`)
                }}
              />
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500">
                <p>Features:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Full Calendar drop-down</li>
                  <li>Custom styled header</li>
                  <li>Year dropdown selectors</li>
                  <li>Accessible icons</li>
                </ul>
              </div>
            </div>

            {/* AG Grid table */}
            <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Recent Sessions Grid</h3>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full font-semibold">
                  AG Grid Community
                </span>
              </div>
              <Table
                columns={TABLE_COLUMNS}
                rowData={TABLE_DATA}
                height={280}
              />
            </div>
          </div>
        </section>

        {/* Overlay Modals trigger section */}
        <section className="bg-slate-900 text-slate-100 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Try the modal component overlay</h3>
            <p className="text-sm text-slate-400 max-w-xl">
              Accessible modals managed by react-modal, customized for smooth overlays, keyboard navigation, and transitions.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Button
              label="Open Quick Edit Modal"
              variant="secondary"
              onClick={() => setShowProfileModal(true)}
            />
            <Button
              label="Trigger Destructive Action"
              variant="important"
              onClick={() => setShowDeleteModal(true)}
            />
          </div>
        </section>
      </main>

      {/* Footer component */}
      <Footer />

      {/* Modal: Quick Edit Profile */}
      <ModalBox
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        title="Quick Edit Profile Info"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Make immediate updates to your live account profile below:</p>
          <MyAccountList
            profile={userProfile}
            onSave={(profile) => {
              handleProfileSave(profile)
              setShowProfileModal(false)
            }}
          />
        </div>
      </ModalBox>

      {/* Modal: Delete Profile Confirmation */}
      <ModalBox
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account Profile"
        size="sm"
      >
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            !
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">Are you absolutely sure?</h4>
            <p className="text-sm text-slate-500">
              This action cannot be undone. This will permanently delete your trainer history, active sessions, and credentials.
            </p>
          </div>
          <div className="flex justify-center gap-3">
            <Button
              label="Yes, Delete Account"
              variant="important"
              onClick={handleDeleteProfile}
            />
            <Button
              label="Cancel"
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            />
          </div>
        </div>
      </ModalBox>
    </div>
  )
}

export default App
