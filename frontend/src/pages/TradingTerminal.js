import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import SimpleChart from '../components/SimpleChart';
import SymbolSelector from '../components/SymbolSelector';
import OrderTicket from '../components/OrderTicket';
import PositionTabs from '../components/PositionTabs';
import { useTradingEngine } from '../hooks/useTradingEngine';
import { RotateCcw, Wallet, TrendingUp } from 'lucide-react';

const TradingTerminal = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTC/USDT');
  
  const {
    balance,
    equity,
    positions,
    orders,
    history,
    marketPrices,
    placeOrder,
    closePosition,
    cancelOrder,
    resetDemo
  } = useTradingEngine();

  const floatingPnL = equity - balance;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold">Averix Trading Terminal</h1>
            <Badge variant="outline" className="text-xs bg-[#2EE6D6]/10 border-[#2EE6D6] text-[#2EE6D6]">
              BETA MODE
            </Badge>
            <Badge variant="outline" className="text-xs">
              Simulated Trades Only
            </Badge>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Account Info */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span className="text-muted-foreground">Balance:</span>
                <span className="font-mono font-semibold">{balance.toFixed(2)} AVRX</span>
              </div>
              
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-muted-foreground">Equity:</span>
                <span className="font-mono font-semibold">{equity.toFixed(2)} AVRX</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">P/L:</span>
                <span className={`font-mono font-semibold ${
                  floatingPnL >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {floatingPnL >= 0 ? '+' : ''}{floatingPnL.toFixed(2)} AVRX
                </span>
              </div>
            </div>

            {/* Reset Demo Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Reset Demo
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset Demo Account</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will reset your demo account to 10,000 AVRX and clear all positions, orders, and trading history. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={resetDemo}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Reset Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Left Panel - Chart */}
        <div className="flex-1 flex flex-col">
          {/* Symbol Selector */}
          <SymbolSelector 
            selectedSymbol={selectedSymbol}
            onSymbolChange={setSelectedSymbol}
          />
          
          {/* Chart */}
          <div className="flex-1 p-4">
            <div className="h-full border border-border rounded-lg overflow-hidden bg-black">
              <SimpleChart symbol={selectedSymbol} />
            </div>
          </div>
        </div>

        {/* Right Panel - Order Ticket & Position Management */}
        <div className="w-full lg:w-96 flex flex-col border-l border-border">
          {/* Order Ticket */}
          <div className="p-4 border-b border-border">
            <OrderTicket
              selectedSymbol={selectedSymbol}
              balance={balance}
              onPlaceOrder={placeOrder}
              marketPrices={marketPrices}
            />
          </div>
          
          {/* Position Management */}
          <div className="flex-1 overflow-hidden">
            <PositionTabs
              positions={positions}
              orders={orders}
              history={history}
              balance={balance}
              equity={equity}
              onClosePosition={closePosition}
              onCancelOrder={cancelOrder}
              marketPrices={marketPrices}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default TradingTerminal;