import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Eye, Search, CheckCircle, XCircle, Calendar } from 'lucide-react';
import GlassPanel from '../components/ui/GlassPanel';
import { mockCertificates } from '../utils/mockData';
import { Certificate } from '../types';
import { format } from 'date-fns';

const Certificates: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || 
                         (selectedStatus === 'Verified' && cert.verified) ||
                         (selectedStatus === 'Pending' && !cert.verified);
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Certificate Management</h1>
          <p className="text-gray-400">Generate, verify, and manage completion certificates.</p>
        </div>
        <motion.button
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 
                   text-white rounded-lg hover:shadow-lg hover:shadow-[#3BBC9B]/25 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Award className="w-5 h-5" />
          Generate Certificate
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#3BBC9B]/20 rounded-lg">
              <Award className="w-5 h-5 text-[#3BBC9B]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Total Issued</h3>
              <p className="text-sm text-gray-400">All time</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-[#3BBC9B]">
            {certificates.length}
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Verified</h3>
              <p className="text-sm text-gray-400">Authenticated</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-green-400">
            {certificates.filter(c => c.verified).length}
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <XCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Pending</h3>
              <p className="text-sm text-gray-400">Awaiting verification</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {certificates.filter(c => !c.verified).length}
          </div>
        </GlassPanel>
      </div>

      {/* Search and Filters */}
      <GlassPanel className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search certificates by learner or course..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg
                       text-white placeholder-gray-400 focus:border-[#3BBC9B] focus:outline-none
                       focus:ring-1 focus:ring-[#3BBC9B] transition-colors"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white
                     focus:border-[#3BBC9B] focus:outline-none focus:ring-1 focus:ring-[#3BBC9B]"
          >
            <option value="All">All Certificates</option>
            <option value="Verified">Verified Only</option>
            <option value="Pending">Pending Verification</option>
          </select>
        </div>
      </GlassPanel>

      {/* Certificate Preview Template */}
      <GlassPanel className="p-6">
        <h2 className="text-xl font-bold text-white mb-4">Certificate Template Preview</h2>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#3BBC9B]/30 rounded-lg p-8 text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 rounded-xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">BPEC-LMS</h1>
              </div>
              <h2 className="text-3xl font-bold text-[#3BBC9B] mb-2">Certificate of Completion</h2>
              <p className="text-gray-400">This certifies that</p>
            </div>

            {/* Content */}
            <div className="mb-8">
              <h3 className="text-4xl font-bold text-white mb-4">[Learner Name]</h3>
              <p className="text-lg text-gray-300 mb-2">has successfully completed</p>
              <h4 className="text-2xl font-bold text-[#3BBC9B] mb-4">[Course Title]</h4>
              <p className="text-gray-400">on [Completion Date]</p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end">
              <div className="text-left">
                <div className="w-32 border-b-2 border-gray-600 mb-2"></div>
                <p className="text-sm text-gray-400">Instructor Signature</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3BBC9B]/20 border border-[#3BBC9B]/30 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-[#3BBC9B]" />
                  <span className="text-sm text-[#3BBC9B] font-medium">Verified Certificate</span>
                </div>
              </div>
              <div className="text-right">
                <div className="w-32 border-b-2 border-gray-600 mb-2"></div>
                <p className="text-sm text-gray-400">Date Issued</p>
              </div>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Certificates List */}
      <GlassPanel className="overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Issued Certificates</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Learner</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Course</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Completion Date</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCertificates.map((certificate, index) => (
                <motion.tr
                  key={certificate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#3BBC9B] to-[#3BBC9B]/80 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {certificate.learnerName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{certificate.learnerName}</p>
                        <p className="text-gray-400 text-sm">ID: {certificate.learnerId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-white font-medium">{certificate.courseName}</p>
                    <p className="text-gray-400 text-sm">Course ID: {certificate.courseId}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-white">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {format(certificate.completionDate, 'MMM dd, yyyy')}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${
                      certificate.verified 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {certificate.verified ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          Pending
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <motion.button
                        className="p-2 text-gray-400 hover:text-[#3BBC9B] hover:bg-[#3BBC9B]/10 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="View Certificate"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Download Certificate"
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </motion.div>
  );
};

export default Certificates;