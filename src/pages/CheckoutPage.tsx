// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useCart } from '../context/CartContext'
// import { getAddressAPI, postAddressAPI, editAddressAPI, deleteAddressAPI } from '../service'

// interface Address {
//   id: string
//   label: string
//   name: string
//   phone: string
//   line1: string
//   line2?: string
//   city: string
//   state: string
//   pincode: string
//   country: string
//   isDefault: boolean
// }

// type AddressForm = Omit<Address, 'id'>

// const STATES = [
//   'Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh',
//   'Telangana', 'Maharashtra', 'Delhi', 'Uttar Pradesh',
//   'Rajasthan', 'Gujarat', 'West Bengal', 'Madhya Pradesh',
// ]

// const EMPTY_FORM: AddressForm = {
//   label: 'Home',
//   name: '',
//   phone: '',
//   line1: '',
//   line2: '',
//   city: '',
//   state: 'Tamil Nadu',
//   pincode: '',
//   country: 'India',
//   isDefault: false,
// }

// /* ── Reusable address form fields ── */
// const AddressFormFields: React.FC<{
//   form: AddressForm
//   onChange: (updated: AddressForm) => void
// }> = ({ form, onChange }) => {
//   const set = (key: keyof AddressForm, val: any) => onChange({ ...form, [key]: val })

//   return (
//     <div className="space-y-4">
//       {/* Label pills */}
//       <div>
//         <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">Label</label>
//         <div className="flex gap-2 flex-wrap">
//           {['Home', 'Office', 'Apartment', 'Other'].map(l => (
//             <button
//               key={l}
//               type="button"
//               onClick={() => set('label', l)}
//               className={`px-3 py-1.5 rounded-lg text-sm font-body font-medium transition-colors ${
//                 form.label === l
//                   ? 'gradient-gold text-white'
//                   : 'bg-gray-100 text-gray-600 hover:bg-gold-100'
//               }`}
//             >
//               {l}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Name & Phone */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {[
//           { k: 'name' as const, l: 'Full Name *', t: 'text', ph: 'Your full name' },
//           { k: 'phone' as const, l: 'Phone Number *', t: 'tel', ph: '+91-XXXXXXXXXX' },
//         ].map(f => (
//           <div key={f.k}>
//             <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">{f.l}</label>
//             <input
//               type={f.t}
//               value={form[f.k] as string}
//               onChange={e => set(f.k, e.target.value)}
//               placeholder={f.ph}
//               className="input-field"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Line 1 & 2 */}
//       {[
//         { k: 'line1' as const, l: 'Street Address *', ph: 'House No., Street, Area' },
//         { k: 'line2' as const, l: 'Landmark / Apartment (optional)', ph: 'Near mall, Floor no.' },
//       ].map(f => (
//         <div key={f.k}>
//           <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">{f.l}</label>
//           <input
//             type="text"
//             value={(form[f.k] as string) ?? ''}
//             onChange={e => set(f.k, e.target.value)}
//             placeholder={f.ph}
//             className="input-field"
//           />
//         </div>
//       ))}

//       {/* City, Pincode, State */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div>
//           <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">City *</label>
//           <input
//             type="text"
//             value={form.city}
//             onChange={e => set('city', e.target.value)}
//             placeholder="City"
//             className="input-field"
//           />
//         </div>
//         <div>
//           <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">Pincode *</label>
//           <input
//             type="text"
//             value={form.pincode}
//             onChange={e => set('pincode', e.target.value)}
//             placeholder="600001"
//             className="input-field"
//           />
//         </div>
//         <div>
//           <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">State</label>
//           <select value={form.state} onChange={e => set('state', e.target.value)} className="input-field">
//             {STATES.map(s => <option key={s}>{s}</option>)}
//           </select>
//         </div>
//       </div>

//       {/* Default checkbox */}
//       <label className="flex items-center gap-3 cursor-pointer">
//         <input
//           type="checkbox"
//           checked={form.isDefault}
//           onChange={e => set('isDefault', e.target.checked)}
//           className="accent-amber-600 w-4 h-4"
//         />
//         <span className="font-body text-sm text-gray-700">Set as default address</span>
//       </label>
//     </div>
//   )
// }

// /* ── Delete confirmation modal ── */
// const DeleteModal: React.FC<{
//   onConfirm: () => void
//   onCancel: () => void
//   loading: boolean
// }> = ({ onConfirm, onCancel, loading }) => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
//     <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-red-100">
//       <div className="text-3xl mb-3 text-center">🗑️</div>
//       <h3
//         style={{ fontFamily: "'Playfair Display',serif" }}
//         className="text-lg font-bold text-gray-900 text-center mb-2"
//       >
//         Remove Address?
//       </h3>
//       <p className="font-body text-sm text-gray-500 text-center mb-6">
//         This address will be permanently deleted and can't be recovered.
//       </p>
//       <div className="flex gap-3">
//         <button onClick={onCancel} disabled={loading} className="btn-outline flex-1 py-2.5 text-sm">
//           Cancel
//         </button>
//         <button
//           onClick={onConfirm}
//           disabled={loading}
//           className="flex-1 py-2.5 text-sm rounded-xl bg-red-500 hover:bg-red-600 text-white font-body font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
//         >
//           {loading
//             ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Deleting…</>
//             : 'Yes, Remove'}
//         </button>
//       </div>
//     </div>
//   </div>
// )

// /* ════════════════════════════════════════
//    MAIN COMPONENT
// ════════════════════════════════════════ */
// const CheckoutPage: React.FC = () => {
//   const [step, setStep] = useState(1)
//   const [addresses, setAddresses] = useState<Address[]>([])
//   const [selectedId, setSelectedId] = useState<string | null>(null)

//   // new address
//   const [showNewForm, setShowNewForm] = useState(false)
//   const [newForm, setNewForm] = useState<AddressForm>(EMPTY_FORM)
//   const [savingNew, setSavingNew] = useState(false)

//   // edit address
//   const [editingId, setEditingId] = useState<string | null>(null)
//   const [editForm, setEditForm] = useState<AddressForm>(EMPTY_FORM)
//   const [savingEdit, setSavingEdit] = useState(false)

//   // delete
//   const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
//   const [deletingId, setDeletingId] = useState<string | null>(null)

//   const [loadingAddresses, setLoadingAddresses] = useState(true)
//   const [addressError, setAddressError] = useState<string | null>(null)
//   const [payment, setPayment] = useState('upi')

//   const { totalPrice, clearCart } = useCart()
//   const delivery = totalPrice >= 999 ? 0 : 50
//   const total = totalPrice + delivery
//   const [orderId] = useState(`#MML${Math.floor(Math.random() * 90000 + 10000)}`)

//   /* ── Fetch ── */
//   useEffect(() => {
//     ;(async () => {
//       try {
//         setLoadingAddresses(true)
//         const res = await getAddressAPI()
//         const data: Address[] = res.data
//         setAddresses(data)
//         const def = data.find(a => a.isDefault)
//         if (def) setSelectedId(def.id)
//         else if (data.length > 0) setSelectedId(data[0].id)
//         else setShowNewForm(true)
//       } catch {
//         setAddressError('Could not load your saved addresses. Please add one below.')
//         setShowNewForm(true)
//       } finally {
//         setLoadingAddresses(false)
//       }
//     })()
//   }, [])

//   /* ── Validation ── */
//   const isValid = (f: AddressForm) =>
//     (['name', 'phone', 'line1', 'city', 'pincode'] as (keyof AddressForm)[]).every(
//       k => (f[k] as string).trim() !== ''
//     )

//   /* ── Add new ── */
//   const handleAddNew = async () => {
//     if (!isValid(newForm)) { setAddressError('Please fill in all required fields.'); return }
//     try {
//       setSavingNew(true); setAddressError(null)
//       const res = await postAddressAPI(newForm)
//       const saved: Address = res.data
//       setAddresses(prev => [...prev, saved])
//       setSelectedId(saved.id)
//       setShowNewForm(false)
//       setNewForm(EMPTY_FORM)
//     } catch {
//       setAddressError('Failed to save address. Please try again.')
//     } finally {
//       setSavingNew(false)
//     }
//   }

//   /* ── Start edit ── */
//   const startEdit = (addr: Address) => {
//     setEditingId(addr.id)
//     setEditForm({
//       label: addr.label, name: addr.name, phone: addr.phone,
//       line1: addr.line1, line2: addr.line2 ?? '',
//       city: addr.city, state: addr.state, pincode: addr.pincode,
//       country: addr.country, isDefault: addr.isDefault,
//     })
//     setShowNewForm(false)
//     setAddressError(null)
//   }

//   /* ── Save edit ── */
//   const handleSaveEdit = async () => {
//     if (!editingId) return
//     if (!isValid(editForm)) { setAddressError('Please fill in all required fields.'); return }
//     try {
//       setSavingEdit(true); setAddressError(null)
//       const res = await editAddressAPI(editingId, editForm)
//       const updated: Address = res.data
//       setAddresses(prev => prev.map(a => a.id === editingId ? updated : a))
//       setEditingId(null)
//     } catch {
//       setAddressError('Failed to update address. Please try again.')
//     } finally {
//       setSavingEdit(false)
//     }
//   }

//   /* ── Delete ── */
//   const handleDelete = async () => {
//     if (!deleteTargetId) return
//     try {
//       setDeletingId(deleteTargetId)
//       await deleteAddressAPI(deleteTargetId)
//       const next = addresses.filter(a => a.id !== deleteTargetId)
//       setAddresses(next)
//       if (selectedId === deleteTargetId) {
//         const fallback = next.find(a => a.isDefault) ?? next[0] ?? null
//         setSelectedId(fallback?.id ?? null)
//         if (next.length === 0) setShowNewForm(true)
//       }
//       if (editingId === deleteTargetId) setEditingId(null)
//     } catch {
//       setAddressError('Failed to remove address. Please try again.')
//     } finally {
//       setDeletingId(null)
//       setDeleteTargetId(null)
//     }
//   }

//   const selectedAddress = addresses.find(a => a.id === selectedId)

//   return (
//     <div className="pt-24 md:pt-36 min-h-screen bg-cream">
//       {/* Delete confirmation modal */}
//       {deleteTargetId && (
//         <DeleteModal
//           onConfirm={handleDelete}
//           onCancel={() => setDeleteTargetId(null)}
//           loading={!!deletingId}
//         />
//       )}

//       <div className="max-w-3xl mx-auto px-4 py-12">
//         <h1 style={{ fontFamily: "'Playfair Display',serif" }} className="text-3xl font-black text-gray-900 mb-8">
//           Checkout
//         </h1>

//         {/* Progress Steps */}
//         <div className="flex items-center gap-2 mb-10">
//           {['Address', 'Payment', 'Confirm'].map((s, i) => (
//             <React.Fragment key={s}>
//               <div className={`flex items-center gap-2 ${i + 1 <= step ? 'text-gold-700' : 'text-gray-400'}`}>
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i + 1 <= step ? 'gradient-gold text-white' : 'bg-gray-200 text-gray-500'}`}>
//                   {i + 1}
//                 </div>
//                 <span className="font-body text-sm font-medium hidden sm:block">{s}</span>
//               </div>
//               {i < 2 && <div className={`flex-1 h-0.5 transition-colors ${i + 1 < step ? 'bg-gold-600' : 'bg-gray-200'}`} />}
//             </React.Fragment>
//           ))}
//         </div>

//         <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gold-100">

//           {/* ════ STEP 1 — ADDRESS ════ */}
//           {step === 1 && (
//             <div>
//               <h2 style={{ fontFamily: "'Playfair Display',serif" }} className="text-xl font-bold text-gray-900 mb-6">
//                 Delivery Address
//               </h2>

//               {loadingAddresses ? (
//                 <div className="flex flex-col items-center py-10 text-gray-400">
//                   <div className="w-8 h-8 border-4 border-gold-300 border-t-gold-600 rounded-full animate-spin mb-3" />
//                   <p className="font-body text-sm">Loading your addresses…</p>
//                 </div>
//               ) : (
//                 <>
//                   {addresses.length > 0 && (
//                     <div className="space-y-3 mb-5">
//                       {addresses.map(addr => (
//                         <div key={addr.id}>

//                           {/* ── Collapsed card ── */}
//                           {editingId !== addr.id && (
//                             <div className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${selectedId === addr.id ? 'border-gold-500 bg-gold-50' : 'border-gray-200 hover:border-gold-300'}`}>
//                               <input
//                                 type="radio"
//                                 name="address"
//                                 className="accent-amber-600 mt-1 flex-shrink-0"
//                                 checked={selectedId === addr.id}
//                                 onChange={() => { setSelectedId(addr.id); setEditingId(null); setShowNewForm(false) }}
//                               />
//                               <div className="flex-1 min-w-0">
//                                 <div className="flex items-center gap-2 mb-0.5">
//                                   <span style={{ fontFamily: "'Playfair Display',serif" }} className="font-bold text-gray-900 text-sm">
//                                     {addr.label}
//                                   </span>
//                                   {addr.isDefault && (
//                                     <span className="text-xs bg-gold-100 text-gold-700 px-2 py-0.5 rounded-full font-body font-medium">Default</span>
//                                   )}
//                                 </div>
//                                 <p className="font-body text-sm text-gray-700 font-medium">{addr.name}</p>
//                                 <p className="font-body text-sm text-gray-500">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
//                                 <p className="font-body text-sm text-gray-500">{addr.city}, {addr.state} – {addr.pincode}</p>
//                                 <p className="font-body text-sm text-gray-500">{addr.phone}</p>
//                               </div>

//                               {/* Edit / Delete buttons */}
//                               <div className="flex items-center gap-1 flex-shrink-0">
//                                 <button
//                                   onClick={() => startEdit(addr)}
//                                   title="Edit"
//                                   className="p-1.5 rounded-lg text-gray-400 hover:text-gold-600 hover:bg-gold-50 transition-colors"
//                                 >
//                                   <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
//                                     <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
//                                   </svg>
//                                 </button>
//                                 <button
//                                   onClick={() => setDeleteTargetId(addr.id)}
//                                   title="Delete"
//                                   className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
//                                 >
//                                   <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <polyline points="3 6 5 6 21 6"/>
//                                     <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
//                                     <path d="M10 11v6M14 11v6"/>
//                                     <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
//                                   </svg>
//                                 </button>
//                               </div>
//                             </div>
//                           )}

//                           {/* ── Inline edit form ── */}
//                           {editingId === addr.id && (
//                             <div className="border-2 border-gold-400 rounded-2xl p-5 bg-gold-50/30">
//                               <div className="flex items-center justify-between mb-4">
//                                 <h3 style={{ fontFamily: "'Playfair Display',serif" }} className="font-bold text-gray-900">
//                                   Edit Address
//                                 </h3>
//                                 <button
//                                   onClick={() => { setEditingId(null); setAddressError(null) }}
//                                   className="text-gray-400 hover:text-gray-600 text-sm font-body"
//                                 >
//                                   ✕ Cancel
//                                 </button>
//                               </div>

//                               <AddressFormFields form={editForm} onChange={setEditForm} />

//                               {addressError && (
//                                 <p className="font-body text-sm text-red-500 mt-3">{addressError}</p>
//                               )}

//                               <button
//                                 onClick={handleSaveEdit}
//                                 disabled={savingEdit}
//                                 className="btn-primary w-full py-3 mt-4 flex items-center justify-center gap-2"
//                               >
//                                 {savingEdit
//                                   ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving…</>
//                                   : 'Save Changes'}
//                               </button>
//                             </div>
//                           )}

//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {/* Add new toggle */}
//                   {!showNewForm && !editingId && (
//                     <button
//                       onClick={() => { setShowNewForm(true); setEditingId(null); setAddressError(null) }}
//                       className="w-full py-3 border-2 border-dashed border-gold-300 rounded-xl text-gold-700 font-body font-medium text-sm hover:bg-gold-50 transition-colors flex items-center justify-center gap-2 mb-5"
//                     >
//                       <span className="text-lg">＋</span> Add New Address
//                     </button>
//                   )}

//                   {/* New address form */}
//                   {showNewForm && (
//                     <div className="border-2 border-gold-200 rounded-2xl p-5 mb-5 bg-gold-50/30">
//                       <div className="flex items-center justify-between mb-4">
//                         <h3 style={{ fontFamily: "'Playfair Display',serif" }} className="font-bold text-gray-900">
//                           New Address
//                         </h3>
//                         {addresses.length > 0 && (
//                           <button
//                             onClick={() => {
//                               setShowNewForm(false); setAddressError(null)
//                               if (!selectedId && addresses.length) setSelectedId(addresses[0].id)
//                             }}
//                             className="text-gray-400 hover:text-gray-600 text-sm font-body"
//                           >
//                             ✕ Cancel
//                           </button>
//                         )}
//                       </div>

//                       <AddressFormFields form={newForm} onChange={setNewForm} />

//                       {addressError && (
//                         <p className="font-body text-sm text-red-500 mt-3">{addressError}</p>
//                       )}

//                       <button
//                         onClick={handleAddNew}
//                         disabled={savingNew}
//                         className="btn-primary w-full py-3 mt-4 flex items-center justify-center gap-2"
//                       >
//                         {savingNew
//                           ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving…</>
//                           : 'Save & Use This Address'}
//                       </button>
//                     </div>
//                   )}

//                   {/* Global error */}
//                   {addressError && !showNewForm && !editingId && (
//                     <p className="font-body text-sm text-red-500 mb-4">{addressError}</p>
//                   )}

//                   <button
//                     onClick={() => setStep(2)}
//                     disabled={!selectedId || !!editingId}
//                     className="btn-primary w-full py-4 disabled:opacity-40 disabled:cursor-not-allowed"
//                   >
//                     Continue to Payment
//                   </button>
//                 </>
//               )}
//             </div>
//           )}

//           {/* ════ STEP 2 — PAYMENT ════ */}
//           {step === 2 && (
//             <div>
//               <h2 style={{ fontFamily: "'Playfair Display',serif" }} className="text-xl font-bold text-gray-900 mb-6">
//                 Payment Method
//               </h2>

//               {selectedAddress && (
//                 <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 mb-6">
//                   <span className="text-lg mt-0.5">📍</span>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-body text-sm font-semibold text-gray-800">
//                       Delivering to: <span className="text-gold-700">{selectedAddress.label}</span>
//                     </p>
//                     <p className="font-body text-sm text-gray-500">
//                       {selectedAddress.line1}, {selectedAddress.city} – {selectedAddress.pincode}
//                     </p>
//                   </div>
//                   <button onClick={() => setStep(1)} className="text-xs font-body text-gold-700 hover:underline flex-shrink-0">
//                     Change
//                   </button>
//                 </div>
//               )}

//               <div className="space-y-3 mb-6">
//                 {[
//                   { k: 'upi', l: 'UPI / GPay / PhonePe / Paytm', i: '📱' },
//                   { k: 'card', l: 'Debit / Credit Card', i: '💳' },
//                   { k: 'netbanking', l: 'Net Banking', i: '🏦' },
//                   { k: 'cod', l: 'Cash on Delivery', i: '💵' },
//                 ].map(p => (
//                   <label
//                     key={p.k}
//                     className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${payment === p.k ? 'border-gold-500 bg-gold-50' : 'border-gray-200 hover:border-gold-300'}`}
//                   >
//                     <input type="radio" name="payment" value={p.k} checked={payment === p.k} onChange={() => setPayment(p.k)} className="accent-amber-600" />
//                     <span className="text-2xl">{p.i}</span>
//                     <span className="font-body font-medium text-gray-900">{p.l}</span>
//                   </label>
//                 ))}
//               </div>

//               <div className="p-4 bg-gold-50 rounded-xl border border-gold-200 mb-6">
//                 <div className="flex justify-between font-body text-gray-600 mb-1"><span>Subtotal</span><span>₹{totalPrice}</span></div>
//                 <div className="flex justify-between font-body text-gray-600 mb-2">
//                   <span>Delivery</span>
//                   <span className={delivery === 0 ? 'text-green-600 font-semibold' : ''}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg border-t border-gold-200 pt-2" style={{ fontFamily: "'Playfair Display',serif" }}>
//                   <span>Total</span><span className="text-gold-700">₹{total}</span>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <button onClick={() => setStep(1)} className="btn-outline flex-1 py-3">Back</button>
//                 <button onClick={() => { clearCart(); setStep(3) }} className="btn-primary flex-1 py-3">
//                   Confirm Order ₹{total}
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* ════ STEP 3 — CONFIRMED ════ */}
//           {step === 3 && (
//             <div className="text-center py-8">
//               <div className="text-7xl mb-4">🎉</div>
//               <h2 style={{ fontFamily: "'Playfair Display',serif" }} className="text-2xl font-bold text-gray-900 mb-3">
//                 Order Confirmed!
//               </h2>
//               <p className="font-body text-gray-600 mb-6">Thank you! You'll receive a confirmation SMS shortly.</p>
//               <div className="p-4 bg-gold-50 rounded-xl inline-block mb-6 border border-gold-200">
//                 <p className="font-body text-sm text-gray-600">
//                   Order ID: <span style={{ fontFamily: "'Playfair Display',serif" }} className="font-bold text-gold-700">{orderId}</span>
//                 </p>
//                 {selectedAddress && (
//                   <p className="font-body text-xs text-gray-500 mt-1">
//                     Delivering to {selectedAddress.label}: {selectedAddress.city}
//                   </p>
//                 )}
//                 <p className="font-body text-xs text-gray-400 mt-1">Expected delivery: 3–5 business days</p>
//               </div>
//               <div className="flex gap-3 justify-center flex-wrap">
//                 <Link to="/orders" className="btn-outline px-6 py-3">View Orders</Link>
//                 <Link to="/shop" className="btn-primary px-6 py-3">Continue Shopping</Link>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   )
// }

// export default CheckoutPage









import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getAddressAPI, postAddressAPI, editAddressAPI, deleteAddressAPI, addOrdersAPI } from '../service'

interface Address {
  id: string
  label: string
  name: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  country: string
  isDefault: boolean
}

type AddressForm = Omit<Address, 'id'>

const STATES = [
  'Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh',
  'Telangana', 'Maharashtra', 'Delhi', 'Uttar Pradesh',
  'Rajasthan', 'Gujarat', 'West Bengal', 'Madhya Pradesh',
]

const EMPTY_FORM: AddressForm = {
  label: 'Home',
  name: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: 'Tamil Nadu',
  pincode: '',
  country: 'India',
  isDefault: false,
}

/* ── Reusable address form fields ── */
const AddressFormFields: React.FC<{
  form: AddressForm
  onChange: (updated: AddressForm) => void
}> = ({ form, onChange }) => {
  const set = (key: keyof AddressForm, val: any) => onChange({ ...form, [key]: val })

  return (
    <div className="space-y-4">
      <div>
        <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">Label</label>
        <div className="flex gap-2 flex-wrap">
          {['Home', 'Office', 'Apartment', 'Other'].map(l => (
            <button
              key={l}
              type="button"
              onClick={() => set('label', l)}
              className={`px-3 py-1.5 rounded-lg text-sm font-body font-medium transition-colors ${form.label === l ? 'gradient-gold text-white' : 'bg-gray-100 text-gray-600 hover:bg-gold-100'
                }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { k: 'name' as const, l: 'Full Name *', t: 'text', ph: 'Your full name' },
          { k: 'phone' as const, l: 'Phone Number *', t: 'tel', ph: '+91-XXXXXXXXXX' },
        ].map(f => (
          <div key={f.k}>
            <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">{f.l}</label>
            <input
              type={f.t}
              value={form[f.k] as string}
              onChange={e => set(f.k, e.target.value)}
              placeholder={f.ph}
              className="input-field"
            />
          </div>
        ))}
      </div>

      {[
        { k: 'line1' as const, l: 'Street Address *', ph: 'House No., Street, Area' },
        { k: 'line2' as const, l: 'Landmark / Apartment (optional)', ph: 'Near mall, Floor no.' },
      ].map(f => (
        <div key={f.k}>
          <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">{f.l}</label>
          <input
            type="text"
            value={(form[f.k] as string) ?? ''}
            onChange={e => set(f.k, e.target.value)}
            placeholder={f.ph}
            className="input-field"
          />
        </div>
      ))}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">City *</label>
          <input type="text" value={form.city} onChange={e => set('city', e.target.value)} placeholder="City" className="input-field" />
        </div>
        <div>
          <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">Pincode *</label>
          <input type="text" value={form.pincode} onChange={e => set('pincode', e.target.value)} placeholder="600001" className="input-field" />
        </div>
        <div>
          <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">State</label>
          <select value={form.state} onChange={e => set('state', e.target.value)} className="input-field">
            {STATES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={e => set('isDefault', e.target.checked)}
          className="accent-amber-600 w-4 h-4"
        />
        <span className="font-body text-sm text-gray-700">Set as default address</span>
      </label>
    </div>
  )
}

/* ── Delete confirmation modal ── */
const DeleteModal: React.FC<{
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}> = ({ onConfirm, onCancel, loading }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-red-100">
      <div className="text-3xl mb-3 text-center">🗑️</div>
      <h3 style={{ fontFamily: "'Playfair Display',serif" }} className="text-lg font-bold text-gray-900 text-center mb-2">
        Remove Address?
      </h3>
      <p className="font-body text-sm text-gray-500 text-center mb-6">
        This address will be permanently deleted and can't be recovered.
      </p>
      <div className="flex gap-3">
        <button onClick={onCancel} disabled={loading} className="btn-outline flex-1 py-2.5 text-sm">Cancel</button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 py-2.5 text-sm rounded-xl bg-red-500 hover:bg-red-600 text-white font-body font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading
            ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Deleting…</>
            : 'Yes, Remove'}
        </button>
      </div>
    </div>
  </div>
)

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState(1)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // new address
  const [showNewForm, setShowNewForm] = useState(false)
  const [newForm, setNewForm] = useState<AddressForm>(EMPTY_FORM)
  const [savingNew, setSavingNew] = useState(false)

  // edit address
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<AddressForm>(EMPTY_FORM)
  const [savingEdit, setSavingEdit] = useState(false)

  // delete
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [loadingAddresses, setLoadingAddresses] = useState(true)
  const [addressError, setAddressError] = useState<string | null>(null)
  const [payment, setPayment] = useState('upi')

  // order
  const [placingOrder, setPlacingOrder] = useState(false)
  const [orderError, setOrderError] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  const { totalPrice, clearCart, items, discount, appliedCoupon } = useCart()
  const delivery = totalPrice >= 999 ? 0 : 50
  const total = totalPrice + delivery
  const discountTotal = totalPrice + delivery - discount;
  const totalDiscountPrice = totalPrice - discount
  const selectedAddress = addresses.find(a => a.id === selectedId)

  /* ── Fetch addresses ── */
  useEffect(() => {
    ; (async () => {
      try {
        setLoadingAddresses(true)
        const res = await getAddressAPI()
        const data: Address[] = res.data
        setAddresses(data)
        const def = data.find(a => a.isDefault)
        if (def) setSelectedId(def.id)
        else if (data.length > 0) setSelectedId(data[0].id)
        else setShowNewForm(true)
      } catch {
        setAddressError('Could not load your saved addresses. Please add one below.')
        setShowNewForm(true)
      } finally {
        setLoadingAddresses(false)
      }
    })()
  }, [])

  /* ── Validation ── */
  const isValid = (f: AddressForm) =>
    (['name', 'phone', 'line1', 'city', 'pincode'] as (keyof AddressForm)[]).every(
      k => (f[k] as string).trim() !== ''
    )

  /* ── Add new address ── */
  const handleAddNew = async () => {
    if (!isValid(newForm)) { setAddressError('Please fill in all required fields.'); return }
    try {
      setSavingNew(true); setAddressError(null)
      const res = await postAddressAPI(newForm)
      const saved: Address = res.data
      setAddresses(prev => [...prev, saved])
      setSelectedId(saved.id)
      setShowNewForm(false)
      setNewForm(EMPTY_FORM)
    } catch {
      setAddressError('Failed to save address. Please try again.')
    } finally {
      setSavingNew(false)
    }
  }

  /* ── Start edit ── */
  const startEdit = (addr: Address) => {
    setEditingId(addr.id)
    setEditForm({
      label: addr.label, name: addr.name, phone: addr.phone,
      line1: addr.line1, line2: addr.line2 ?? '',
      city: addr.city, state: addr.state, pincode: addr.pincode,
      country: addr.country, isDefault: addr.isDefault,
    })
    setShowNewForm(false)
    setAddressError(null)
  }

  /* ── Save edit ── */
  const handleSaveEdit = async () => {
    if (!editingId) return
    if (!isValid(editForm)) { setAddressError('Please fill in all required fields.'); return }
    try {
      setSavingEdit(true); setAddressError(null)
      const res = await editAddressAPI(editingId, editForm)
      const updated: Address = res.data
      setAddresses(prev => prev.map(a => a.id === editingId ? updated : a))
      setEditingId(null)
    } catch {
      setAddressError('Failed to update address. Please try again.')
    } finally {
      setSavingEdit(false)
    }
  }

  /* ── Delete address ── */
  const handleDelete = async () => {
    if (!deleteTargetId) return
    try {
      setDeletingId(deleteTargetId)
      await deleteAddressAPI(deleteTargetId)
      const next = addresses.filter(a => a.id !== deleteTargetId)
      setAddresses(next)
      if (selectedId === deleteTargetId) {
        const fallback = next.find(a => a.isDefault) ?? next[0] ?? null
        setSelectedId(fallback?.id ?? null)
        if (next.length === 0) setShowNewForm(true)
      }
      if (editingId === deleteTargetId) setEditingId(null)
    } catch {
      setAddressError('Failed to remove address. Please try again.')
    } finally {
      setDeletingId(null)
      setDeleteTargetId(null)
    }
  }

  /* ── Place order ── */
  const handleConfirmOrder = async () => {
    if (!selectedAddress) return
    setPlacingOrder(true)
    setOrderError(null)
    try {
      const reqData = {
        addressId: selectedAddress.id,
        paymentMethod: payment.toUpperCase(),
        couponCode: appliedCoupon,
        notes: '',
        discountAmount: discount,
        items: items.map((item: any) => ({
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      }

      const res = await addOrdersAPI(reqData)
      const data = res.data
      // Adjust key based on your API response shape
      setOrderId(data.orderNumber ?? data.id ?? data.order?.id ?? null)
      clearCart()
      setStep(3)
    } catch {
      setOrderError('Failed to place order. Please try again.')
    } finally {
      setPlacingOrder(false)
    }
  }

  return (
    <div className="pt-24 md:pt-36 min-h-screen bg-cream">
      {deleteTargetId && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setDeleteTargetId(null)}
          loading={!!deletingId}
        />
      )}

      <div className="max-w mx-auto px-4 py-12">
        <h1 style={{ fontFamily: "'Playfair Display',serif" }} className="text-3xl font-black text-gray-900 mb-8">
          Checkout
        </h1>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-10">
          {['Address', 'Payment', 'Confirm'].map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 ${i + 1 <= step ? 'text-gold-700' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i + 1 <= step ? 'gradient-gold text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {i + 1}
                </div>
                <span className="font-body text-sm font-medium hidden sm:block">{s}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-0.5 transition-colors ${i + 1 < step ? 'bg-gold-600' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gold-100">

          {/* ════ STEP 1 — ADDRESS ════ */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif" }} className="text-xl font-bold text-gray-900 mb-6">
                Delivery Address
              </h2>

              {loadingAddresses ? (
                <div className="flex flex-col items-center py-10 text-gray-400">
                  <div className="w-8 h-8 border-4 border-gold-300 border-t-gold-600 rounded-full animate-spin mb-3" />
                  <p className="font-body text-sm">Loading your addresses…</p>
                </div>
              ) : (
                <>
                  {addresses.length > 0 && (
                    <div className="space-y-3 mb-5">
                      {addresses.map(addr => (
                        <div key={addr.id}>
                          {/* Collapsed card */}
                          {editingId !== addr.id && (
                            <div
                              onClick={() => { setSelectedId(addr.id); setEditingId(null); setShowNewForm(false) }}
                              className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${selectedId === addr.id ? 'border-gold-500 bg-gold-50' : 'border-gray-200 hover:border-gold-300'}`}>
                              <input
                                type="radio"
                                name="address"
                                className="accent-amber-600 mt-1 flex-shrink-0"
                                checked={selectedId === addr.id}
                                onChange={() => { setSelectedId(addr.id); setEditingId(null); setShowNewForm(false) }}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span style={{ fontFamily: "'Playfair Display',serif" }} className="font-bold text-gray-900 text-sm">{addr.label}</span>
                                  {addr.isDefault && (
                                    <span className="text-xs bg-gold-100 text-gold-700 px-2 py-0.5 rounded-full font-body font-medium">Default</span>
                                  )}
                                </div>
                                <p className="font-body text-sm text-gray-700 font-medium">{addr.name}</p>
                                <p className="font-body text-sm text-gray-500">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
                                <p className="font-body text-sm text-gray-500">{addr.city}, {addr.state} – {addr.pincode}</p>
                                <p className="font-body text-sm text-gray-500">{addr.phone}</p>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <button onClick={(e) => { e.stopPropagation(); startEdit(addr) }} title="Edit" className="p-1.5 rounded-lg text-gray-400 hover:text-gold-600 hover:bg-gold-50 transition-colors">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                  </svg>
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); setDeleteTargetId(addr.id) }} title="Delete" className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                    <path d="M10 11v6M14 11v6" />
                                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Inline edit form */}
                          {editingId === addr.id && (
                            <div className="border-2 border-gold-400 rounded-2xl p-5 bg-gold-50/30">
                              <div className="flex items-center justify-between mb-4">
                                <h3 style={{ fontFamily: "'Playfair Display',serif" }} className="font-bold text-gray-900">Edit Address</h3>
                                <button onClick={() => { setEditingId(null); setAddressError(null) }} className="text-gray-400 hover:text-gray-600 text-sm font-body">✕ Cancel</button>
                              </div>
                              <AddressFormFields form={editForm} onChange={setEditForm} />
                              {addressError && <p className="font-body text-sm text-red-500 mt-3">{addressError}</p>}
                              <button onClick={handleSaveEdit} disabled={savingEdit} className="btn-primary w-full py-3 mt-4 flex items-center justify-center gap-2">
                                {savingEdit
                                  ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving…</>
                                  : 'Save Changes'}
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add new toggle */}
                  {!showNewForm && !editingId && (
                    <button
                      onClick={() => { setShowNewForm(true); setEditingId(null); setAddressError(null) }}
                      className="w-full py-3 border-2 border-dashed border-gold-300 rounded-xl text-gold-700 font-body font-medium text-sm hover:bg-gold-50 transition-colors flex items-center justify-center gap-2 mb-5"
                    >
                      <span className="text-lg">＋</span> Add New Address
                    </button>
                  )}

                  {/* New address form */}
                  {showNewForm && (
                    <div className="border-2 border-gold-200 rounded-2xl p-5 mb-5 bg-gold-50/30">
                      <div className="flex items-center justify-between mb-4">
                        <h3 style={{ fontFamily: "'Playfair Display',serif" }} className="font-bold text-gray-900">New Address</h3>
                        {addresses.length > 0 && (
                          <button
                            onClick={() => { setShowNewForm(false); setAddressError(null); if (!selectedId && addresses.length) setSelectedId(addresses[0].id) }}
                            className="text-gray-400 hover:text-gray-600 text-sm font-body"
                          >
                            ✕ Cancel
                          </button>
                        )}
                      </div>
                      <AddressFormFields form={newForm} onChange={setNewForm} />
                      {addressError && <p className="font-body text-sm text-red-500 mt-3">{addressError}</p>}
                      <button onClick={handleAddNew} disabled={savingNew} className="btn-primary w-full py-3 mt-4 flex items-center justify-center gap-2">
                        {savingNew
                          ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving…</>
                          : 'Save & Use This Address'}
                      </button>
                    </div>
                  )}

                  {addressError && !showNewForm && !editingId && (
                    <p className="font-body text-sm text-red-500 mb-4">{addressError}</p>
                  )}

                  <button
                    onClick={() => setStep(2)}
                    disabled={!selectedId || !!editingId}
                    className="btn-primary w-full py-4 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue to Payment
                  </button>
                </>
              )}
            </div>
          )}

          {/* ════ STEP 2 — PAYMENT ════ */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif" }} className="text-xl font-bold text-gray-900 mb-6">
                Payment Method
              </h2>

              {selectedAddress && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 mb-6">
                  <span className="text-lg mt-0.5">📍</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-gray-800">
                      Delivering to: <span className="text-gold-700">{selectedAddress.label}</span>
                    </p>
                    <p className="font-body text-sm text-gray-500">
                      {selectedAddress.line1}, {selectedAddress.city} – {selectedAddress.pincode}
                    </p>
                  </div>
                  <button onClick={() => setStep(1)} className="text-xs font-body text-gold-700 hover:underline flex-shrink-0">Change</button>
                </div>
              )}

              <div className="space-y-3 mb-6">
                {[
                  { k: 'upi', l: 'UPI / GPay / PhonePe / Paytm', i: '📱' },
                  { k: 'card', l: 'Debit / Credit Card', i: '💳' },
                  { k: 'netbanking', l: 'Net Banking', i: '🏦' },
                  { k: 'cod', l: 'Cash on Delivery', i: '💵' },
                ].map(p => (
                  <label
                    key={p.k}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${payment === p.k ? 'border-gold-500 bg-gold-50' : 'border-gray-200 hover:border-gold-300'}`}
                  >
                    <input type="radio" name="payment" value={p.k} checked={payment === p.k} onChange={() => setPayment(p.k)} className="accent-amber-600" />
                    <span className="text-2xl">{p.i}</span>
                    <span className="font-body font-medium text-gray-900">{p.l}</span>
                  </label>
                ))}
              </div>

              <div className="p-4 bg-gold-50 rounded-xl border border-gold-200 mb-6">
                <div className="flex justify-between font-body text-gray-600 mb-1"><span>Subtotal</span><span>₹{totalDiscountPrice}</span></div>
                <div className="flex justify-between font-body text-gray-600 mb-2">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? 'text-green-600 font-semibold' : ''}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gold-200 pt-2" style={{ fontFamily: "'Playfair Display',serif" }}>
                  <span>Total</span><span className="text-gold-700">₹{discountTotal}</span>
                </div>
              </div>

              {orderError && (
                <p className="font-body text-sm text-red-500 mb-3 text-center bg-red-50 border border-red-200 rounded-xl px-4 py-2">
                  {orderError}
                </p>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} disabled={placingOrder} className="btn-outline flex-1 py-3">Back</button>
                <button
                  onClick={handleConfirmOrder}
                  disabled={placingOrder}
                  className="btn-primary flex-1 py-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {placingOrder
                    ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Placing Order…</>
                    : `Confirm Order ₹${discountTotal}`}
                </button>
              </div>
            </div>
          )}

          {/* ════ STEP 3 — CONFIRMED ════ */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="text-7xl mb-4">🎉</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif" }} className="text-2xl font-bold text-gray-900 mb-3">
                Order Confirmed!
              </h2>
              <p className="font-body text-gray-600 mb-6">Thank you! You'll receive a confirmation SMS shortly.</p>
              <div className="p-4 bg-gold-50 rounded-xl inline-block mb-6 border border-gold-200">
                <p className="font-body text-sm text-gray-600">
                  Order ID:{' '}
                  <span style={{ fontFamily: "'Playfair Display',serif" }} className="font-bold text-gold-700">
                    {orderId ?? '—'}
                  </span>
                </p>
                {selectedAddress && (
                  <p className="font-body text-xs text-gray-500 mt-1">
                    Delivering to {selectedAddress.label}: {selectedAddress.city}
                  </p>
                )}
                <p className="font-body text-xs text-gray-400 mt-1">Expected delivery: 3–5 business days</p>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link to="/orders" className="btn-outline px-6 py-3">View Orders</Link>
                <Link to="/shop" className="btn-primary px-6 py-3">Continue Shopping</Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default CheckoutPage