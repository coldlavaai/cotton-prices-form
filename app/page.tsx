'use client'

import { useState, FormEvent } from 'react'

export default function CottonPricesForm() {
  const today = new Date().toISOString().split('T')[0]

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [formData, setFormData] = useState({
    date: today,
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

      // Reset form but keep today's date
      setFormData({
        date: today,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Daily Cotton Prices Entry</h1>
          <p className="text-gray-600 mb-6">Enter today's cotton price data</p>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Date and Marketing Year */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Date Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marketing Year
                  </label>
                  <input
                    type="text"
                    name="marketing_year"
                    value={formData.marketing_year}
                    onChange={handleChange}
                    placeholder="e.g., 25/26"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Exchange Rates */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Exchange Rates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CNY Exchange Rate
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    name="cny_exchange_rate"
                    value={formData.cny_exchange_rate}
                    onChange={handleChange}
                    placeholder="7.0768"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    INR Exchange Rate
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    name="inr_exchange_rate"
                    value={formData.inr_exchange_rate}
                    onChange={handleChange}
                    placeholder="89.5530"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* CZCE Cotton */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">CZCE Cotton</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CZCE Cotton
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="czce_cotton"
                    value={formData.czce_cotton}
                    onChange={handleChange}
                    placeholder="13760.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CZCE Cotton USC/LB
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="czce_cotton_usc_lb"
                    value={formData.czce_cotton_usc_lb}
                    onChange={handleChange}
                    placeholder="88.20"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* CZCE Yarn */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">CZCE Yarn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CZCE Yarn
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="czce_yarn"
                    value={formData.czce_yarn}
                    onChange={handleChange}
                    placeholder="20045.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CZCE Yarn USC/LB
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="czce_yarn_usc_lb"
                    value={formData.czce_yarn_usc_lb}
                    onChange={handleChange}
                    placeholder="128.48"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* CC Index */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">CC Index</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CC Index
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="cc_index"
                    value={formData.cc_index}
                    onChange={handleChange}
                    placeholder="14936.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CC Index USC/LB
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="cc_index_usc_lb"
                    value={formData.cc_index_usc_lb}
                    onChange={handleChange}
                    placeholder="95.73"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* CZCE PSF */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">CZCE PSF</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CZCE PSF
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="czce_psf"
                    value={formData.czce_psf}
                    onChange={handleChange}
                    placeholder="6276.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CZCE PSF USC/LB
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="czce_psf_usc_lb"
                    value={formData.czce_psf_usc_lb}
                    onChange={handleChange}
                    placeholder="40.23"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* CZCE PTA */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">CZCE PTA</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CZCE PTA
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="czce_pta"
                    value={formData.czce_pta}
                    onChange={handleChange}
                    placeholder="4736.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CZCE PTA USC/LB
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="czce_pta_usc_lb"
                    value={formData.czce_pta_usc_lb}
                    onChange={handleChange}
                    placeholder="30.36"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* MCX */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">MCX</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    MCX
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="mcx"
                    value={formData.mcx}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    MCX USC/LB
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="mcx_usc_lb"
                    value={formData.mcx_usc_lb}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* ICE */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">ICE</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ICE
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="ice"
                    value={formData.ice}
                    onChange={handleChange}
                    placeholder="64.63"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ICE High
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="ice_hi"
                    value={formData.ice_hi}
                    onChange={handleChange}
                    placeholder="64.82"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ICE Low
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="ice_lo"
                    value={formData.ice_lo}
                    onChange={handleChange}
                    placeholder="64.27"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ICE Spread
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="ice_spread"
                    value={formData.ice_spread}
                    onChange={handleChange}
                    placeholder="-1.15"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Trading Data */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Trading Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Volume
                  </label>
                  <input
                    type="text"
                    name="volume"
                    value={formData.volume}
                    onChange={handleChange}
                    placeholder="33,524"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Interest
                  </label>
                  <input
                    type="text"
                    name="open_interest"
                    value={formData.open_interest}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Other Indices */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Other Indices</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    A Index
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="a_index"
                    value={formData.a_index}
                    onChange={handleChange}
                    placeholder="75.05"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    AWP
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="awp"
                    value={formData.awp}
                    onChange={handleChange}
                    placeholder="50.77"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificates
                  </label>
                  <input
                    type="text"
                    name="certificates"
                    value={formData.certificates}
                    onChange={handleChange}
                    placeholder="20,344"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EFP
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="efp"
                    value={formData.efp}
                    onChange={handleChange}
                    placeholder="113.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
