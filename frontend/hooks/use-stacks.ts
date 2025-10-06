import { createNewGame, joinGame, Move, play } from '@/lib/contract'
import { getStxBalance } from '@/lib/stx-utils'
import {
  connect,
  disconnect,
  isConnected,
  getLocalStorage,
  openContractCall,
  type UserData
} from '@stacks/connect'
import { PostConditionMode } from '@stacks/transactions'
import { useEffect, useState } from 'react'

const appDetails = {
  name: 'Tic Tac Toe',
  icon: 'https://cryptologos.cc/logos/stacks-stx-logo.png'
}

export function useStacks() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [stxBalance, setStxBalance] = useState(0)

  async function connectWallet() {
    try {
      const result = await connect()
      console.log('Connected to wallet:', result)

      // Get the stored data and set user data
      const localStorage = getLocalStorage()
      if (localStorage?.addresses?.stx?.[0]?.address) {
        setUserData({
          profile: {
            stxAddress: {
              testnet: localStorage.addresses.stx[0].address,
              mainnet: localStorage.addresses.stx[0].address
            }
          }
        } as UserData)
      }

      window.alert('Connected to wallet')
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      window.alert('Failed to connect wallet')
    }
  }

  function disconnectWallet() {
    disconnect()
    setUserData(null)
  }

  async function handleCreateGame(betAmount: number, moveIndex: number, move: Move) {
    if (typeof window === 'undefined') return
    if (moveIndex < 0 || moveIndex > 8) {
      window.alert('Invalid move. Please make a valid move.')
      return
    }
    if (betAmount === 0) {
      window.alert('Please make a bet')
      return
    }

    try {
      if (!userData) throw new Error('User not connected')
      const txOptions = await createNewGame(betAmount, moveIndex, move)
      await openContractCall({
        ...txOptions,
        appDetails,
        onFinish: (data) => {
          console.log(data)
          window.alert('Sent create game transaction')
        },
        postConditionMode: PostConditionMode.Allow
      })
    } catch (_err) {
      const err = _err as Error
      console.error(err)
      window.alert(err.message)
    }
  }

  async function handleJoinGame(gameId: number, moveIndex: number, move: Move) {
    if (typeof window === 'undefined') return
    if (moveIndex < 0 || moveIndex > 8) {
      window.alert('Invalid move. Please make a valid move.')
      return
    }

    try {
      if (!userData) throw new Error('User not connected')
      const txOptions = await joinGame(gameId, moveIndex, move)
      await openContractCall({
        ...txOptions,
        appDetails,
        onFinish: (data) => {
          console.log(data)
          window.alert('Sent join game transaction')
        },
        postConditionMode: PostConditionMode.Allow
      })
    } catch (_err) {
      const err = _err as Error
      console.error(err)
      window.alert(err.message)
    }
  }

  async function handlePlayGame(gameId: number, moveIndex: number, move: Move) {
    if (typeof window === 'undefined') return
    if (moveIndex < 0 || moveIndex > 8) {
      window.alert('Invalid move. Please make a valid move.')
      return
    }

    try {
      if (!userData) throw new Error('User not connected')
      const txOptions = await play(gameId, moveIndex, move)
      await openContractCall({
        ...txOptions,
        appDetails,
        onFinish: (data) => {
          console.log(data)
          window.alert('Sent play game transaction')
        },
        postConditionMode: PostConditionMode.Allow
      })
    } catch (_err) {
      const err = _err as Error
      console.error(err)
      window.alert(err.message)
    }
  }

  useEffect(() => {
    // Check if user is already connected on component mount
    if (isConnected()) {
      const localStorage = getLocalStorage()
      if (localStorage?.addresses?.stx?.[0]?.address) {
        setUserData({
          profile: {
            stxAddress: {
              testnet: localStorage.addresses.stx[0].address,
              mainnet: localStorage.addresses.stx[0].address
            }
          }
        } as UserData)
      }
    }
  }, [])

  useEffect(() => {
    if (userData) {
      const address = userData.profile.stxAddress.testnet
      getStxBalance(address).then((balance) => {
        setStxBalance(balance)
      })
    }
  }, [userData])

  return {
    userData,
    stxBalance,
    connectWallet,
    disconnectWallet,
    handleCreateGame,
    handleJoinGame,
    handlePlayGame
  }
}
