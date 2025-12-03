'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'

export default function CottonPricesForm() {
  // Default to yesterday since data is always 1 day behind
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const defaultDate = yesterday.toISOString().split('T')[0]

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [formData, setFormData] = useState({
    date: defaultDate,
    marketing_year: '',
    cny_exchange_rate: '',
    czce_cotton: '',
    czce_cotton_usc_lb: '',
    czce_yarn: '',
    czce_yarn_usc_lb: '',
    cc_index: '',
    cc_index_usc_lb: '',
    czce_psf: '',
    czce_psf_usc_lb: '',
    czce_pta: '',
    czce_pta_usc_lb: '',
    inr_exchange_rate: '',
    mcx: '',
    mcx_usc_lb: '',
    ice: '',
    ice_hi: '',
    ice_lo: '',
    ice_spread: '',
    volume: '',
    open_interest: '',
    a_index: '',
    awp: '',
    certificates: '',
    efp: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      // Convert empty strings to null for numeric fields
      const dataToSubmit = {
        ...formData,
        cny_exchange_rate: formData.cny_exchange_rate ? parseFloat(formData.cny_exchange_rate) : null,
        czce_cotton: formData.czce_cotton ? parseFloat(formData.czce_cotton) : null,
        czce_cotton_usc_lb: formData.czce_cotton_usc_lb ? parseFloat(formData.czce_cotton_usc_lb) : null,
        czce_yarn: formData.czce_yarn ? parseFloat(formData.czce_yarn) : null,
        czce_yarn_usc_lb: formData.czce_yarn_usc_lb ? parseFloat(formData.czce_yarn_usc_lb) : null,
        cc_index: formData.cc_index ? parseFloat(formData.cc_index) : null,
        cc_index_usc_lb: formData.cc_index_usc_lb ? parseFloat(formData.cc_index_usc_lb) : null,
        czce_psf: formData.czce_psf ? parseFloat(formData.czce_psf) : null,
        czce_psf_usc_lb: formData.czce_psf_usc_lb ? parseFloat(formData.czce_psf_usc_lb) : null,
        czce_pta: formData.czce_pta ? parseFloat(formData.czce_pta) : null,
        czce_pta_usc_lb: formData.czce_pta_usc_lb ? parseFloat(formData.czce_pta_usc_lb) : null,
        inr_exchange_rate: formData.inr_exchange_rate ? parseFloat(formData.inr_exchange_rate) : null,
        mcx: formData.mcx ? parseFloat(formData.mcx) : null,
        mcx_usc_lb: formData.mcx_usc_lb ? parseFloat(formData.mcx_usc_lb) : null,
        ice: formData.ice ? parseFloat(formData.ice) : null,
        ice_hi: formData.ice_hi ? parseFloat(formData.ice_hi) : null,
        ice_lo: formData.ice_lo ? parseFloat(formData.ice_lo) : null,
        ice_spread: formData.ice_spread ? parseFloat(formData.ice_spread) : null,
        a_index: formData.a_index ? parseFloat(formData.a_index) : null,
        awp: formData.awp ? parseFloat(formData.awp) : null,
        efp: formData.efp ? parseFloat(formData.efp) : null,
      }

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save data')
      }

      setMessage('✅ Data saved successfully!')

      // Reset form but keep yesterday's date
      setFormData({
        date: defaultDate,
        marketing_year: '',
        cny_exchange_rate: '',
        czce_cotton: '',
        czce_cotton_usc_lb: '',
        czce_yarn: '',
        czce_yarn_usc_lb: '',
        cc_index: '',
        cc_index_usc_lb: '',
        czce_psf: '',
        czce_psf_usc_lb: '',
        czce_pta: '',
        czce_pta_usc_lb: '',
        inr_exchange_rate: '',
        mcx: '',
        mcx_usc_lb: '',
        ice: '',
        ice_hi: '',
        ice_lo: '',
        ice_spread: '',
        volume: '',
        open_interest: '',
        a_index: '',
        awp: '',
        certificates: '',
        efp: '',
      })

      setTimeout(() => setMessage(''), 5000)
    } catch (error: any) {
      setMessage('❌ Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Image
              src="/lcb-logo.png"
              alt="Liverpool Cotton Brokers"
              width={80}
              height={40}
              className="object-contain brightness-0 invert"
            />
            <div className="flex flex-col">
              <div className="text-sm font-semibold text-white">Professional Market Intelligence</div>
              <div className="text-xs font-medium text-yellow-500">20 Years of Data</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-slate-900 rounded-lg border border-slate-700 p-8">
          {/* Title Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Daily Cotton Prices Entry</h1>
            <p className="text-slate-400">Enter daily market data for professional analysis and reporting</p>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg border ${
              message.includes('✅')
                ? 'bg-green-950 border-green-800 text-green-400'
                : 'bg-red-950 border-red-800 text-red-400'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Date and Marketing Year */}
            <div className="border-b border-slate-700 pb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-yellow-500 rounded"></span>
                Date Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Marketing Year
                  </label>
                  <input
                    type="text"
                    name="marketing_year"
                    value={formData.marketing_year}
                    onChange={handleChange}
                    placeholder="e.g., 25/26"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Exchange Rates */}
            <div className="border-b border-slate-700 pb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-yellow-500 rounded"></span>
                Exchange Rates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    CNY Exchange Rate
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    name="cny_exchange_rate"
                    value={formData.cny_exchange_rate}
                    onChange={handleChange}
                    placeholder="7.0768"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    INR Exchange Rate
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    name="inr_exchange_rate"
                    value={formData.inr_exchange_rate}
                    onChange={handleChange}
                    placeholder="89.5530"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* CZCE Cotton */}
            <div className="border-b border-slate-700 pb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-yellow-500 rounded"></span>
                CZCE Cotton
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    CZCE Cotton
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="czce_cotton"
                    value={formData.czce_cotton}
                    onChange={handleChange}
                    placeholder="13760.00"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    CZCE Cotton USC/LB
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="czce_cotton_usc_lb"
                    value={formData.czce_cotton_usc_lb}
                    onChange={handleChange}
                    placeholder="88.20"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* CZCE Yarn */}
            <div className="border-b border-slate-700 pb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-yellow-500 rounded"></span>
                CZCE Yarn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    CZCE Yarn
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="czce_yarn"
                    value={formData.czce_yarn}
                    onChange={handleChange}
                    placeholder="20045.00"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    CZCE Yarn USC/LB
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="czce_yarn_usc_lb"
                    value={formData.czce_yarn_usc_lb}
                    onChange={handleChange}
                    placeholder="128.48"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* CC Index */}
            <div className="border-b border-slate-700 pb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-yellow-500 rounded"></span>
                CC Index
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    CC Index
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="cc_index"
                    value={formData.cc_index}
                    onChange={handleChange}
                    placeholder="14936.00"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    CC Index USC/LB
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="cc_index_usc_lb"
                    value={formData.cc_index_usc_lb}
                    onChange={handleChange}
                    placeholder="95.73"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* CZCE PSF */}
            <div className="border-b border-slate-700 pb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-yellow-500 rounded"></span>
                CZCE PSF
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    CZCE PSF
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="czce_psf"
                    value={formData.czce_psf}
                    onChange={handleChange}
                    placeholder="6276.00"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    CZCE PSF USC/LB
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="czce_psf_usc_lb"
                    value={formData.czce_psf_usc_lb}
                    onChange={handleChange}
                    placeholder="40.23"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* CZCE PTA */}
            <div className="border-b border-slate-700 pb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-yellow-500 rounded"></span>
                CZCE PTA
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    CZCE PTA
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="czce_pta"
                    value={formData.czce_pta}
                    onChange={handleChange}
                    placeholder="4736.00"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    CZCE PTA USC/LB
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="czce_pta_usc_lb"
                    value={formData.czce_pta_usc_lb}
                    onChange={handleChange}
                    placeholder="30.36"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* MCX */}
            <div className="border-b border-slate-700 pb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-yellow-500 rounded"></span>
                MCX
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    MCX
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="mcx"
                    value={formData.mcx}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    MCX USC/LB
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="mcx_usc_lb"
                    value={formData.mcx_usc_lb}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* ICE */}
            <div className="border-b border-slate-700 pb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-yellow-500 rounded"></span>
                ICE
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    ICE
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="ice"
                    value={formData.ice}
                    onChange={handleChange}
                    placeholder="64.63"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    ICE High
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="ice_hi"
                    value={formData.ice_hi}
                    onChange={handleChange}
                    placeholder="64.82"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    ICE Low
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="ice_lo"
                    value={formData.ice_lo}
                    onChange={handleChange}
                    placeholder="64.27"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    ICE Spread
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="ice_spread"
                    value={formData.ice_spread}
                    onChange={handleChange}
                    placeholder="-1.15"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Trading Data */}
            <div className="border-b border-slate-700 pb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-yellow-500 rounded"></span>
                Trading Data
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Volume
                  </label>
                  <input
                    type="text"
                    name="volume"
                    value={formData.volume}
                    onChange={handleChange}
                    placeholder="33,524"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Open Interest
                  </label>
                  <input
                    type="text"
                    name="open_interest"
                    value={formData.open_interest}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Other Indices */}
            <div className="pb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-yellow-500 rounded"></span>
                Other Indices
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    A Index
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="a_index"
                    value={formData.a_index}
                    onChange={handleChange}
                    placeholder="75.05"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    AWP
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="awp"
                    value={formData.awp}
                    onChange={handleChange}
                    placeholder="50.77"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Certificates
                  </label>
                  <input
                    type="text"
                    name="certificates"
                    value={formData.certificates}
                    onChange={handleChange}
                    placeholder="20,344"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    EFP
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="efp"
                    value={formData.efp}
                    onChange={handleChange}
                    placeholder="113.00"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-slate-700">
              <button
                type="submit"
                disabled={loading}
                className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Submit Daily Prices'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
