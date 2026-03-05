;; StacksPayProof - Onchain Payment Receipt Protocol
;; Records verifiable payment receipts for merchants

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-merchant-not-found (err u101))
(define-constant err-invalid-amount (err u102))
(define-constant err-invalid-name (err u103))

;; Data Variables
(define-data-var merchant-counter uint u0)
(define-data-var receipt-counter uint u0)

;; Data Maps
(define-map merchants
  { merchant-id: uint }
  {
    owner: principal,
    name: (string-ascii 64),
    created-at: uint,
    total-payments: uint
  }
)

(define-map receipts
  { receipt-id: uint }
  {
    merchant-id: uint,
    payer: principal,
    amount: uint,
    currency: (string-ascii 10),
    payment-reference: (string-ascii 128),
    timestamp: uint
  }
)

;; Public Functions

;; Register a new merchant
(define-public (register-merchant (name (string-ascii 64)))
  (let
    (
      (new-merchant-id (+ (var-get merchant-counter) u1))
    )
    (asserts! (> (len name) u0) err-invalid-name)
    (map-set merchants
      { merchant-id: new-merchant-id }
      {
        owner: tx-sender,
        name: name,
        created-at: block-height,
        total-payments: u0
      }
    )
    (var-set merchant-counter new-merchant-id)
    (ok new-merchant-id)
  )
)

;; Record a payment receipt
(define-public (record-payment 
  (merchant-id uint)
  (amount uint)
  (currency (string-ascii 10))
  (payment-reference (string-ascii 128)))
  (let
    (
      (merchant (unwrap! (map-get? merchants { merchant-id: merchant-id }) err-merchant-not-found))
      (new-receipt-id (+ (var-get receipt-counter) u1))
    )
    (asserts! (> amount u0) err-invalid-amount)
    
    ;; Store receipt
    (map-set receipts
      { receipt-id: new-receipt-id }
      {
        merchant-id: merchant-id,
        payer: tx-sender,
        amount: amount,
        currency: currency,
        payment-reference: payment-reference,
        timestamp: block-height
      }
    )
    
    ;; Update merchant payment count
    (map-set merchants
      { merchant-id: merchant-id }
      (merge merchant { total-payments: (+ (get total-payments merchant) u1) })
    )
    
    (var-set receipt-counter new-receipt-id)
    
    ;; Emit event
    (print {
      event: "payment-recorded",
      merchant-id: merchant-id,
      receipt-id: new-receipt-id,
      amount: amount,
      currency: currency,
      timestamp: block-height
    })
    
    (ok new-receipt-id)
  )
)

;; Read-only Functions

;; Verify and get receipt details
(define-read-only (verify-receipt (receipt-id uint))
  (ok (map-get? receipts { receipt-id: receipt-id }))
)

;; Get merchant details
(define-read-only (get-merchant (merchant-id uint))
  (ok (map-get? merchants { merchant-id: merchant-id }))
)

;; Get merchant payment count
(define-read-only (get-merchant-payments (merchant-id uint))
  (match (map-get? merchants { merchant-id: merchant-id })
    merchant (ok (get total-payments merchant))
    err-merchant-not-found
  )
)

;; Get current counters
(define-read-only (get-counters)
  (ok {
    merchants: (var-get merchant-counter),
    receipts: (var-get receipt-counter)
  })
)
