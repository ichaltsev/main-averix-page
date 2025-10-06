import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import ThemeSwitcher from './ThemeSwitcher';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
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
} from './ui/alert-dialog';
import { X, Edit3, TrendingUp, TrendingDown } from 'lucide-react';

const PositionTabs = ({ 
  positions, 
  orders, 
  history, 
  balance,
  equity,
  onClosePosition,
  onCancelOrder,
  marketPrices = {}
}) => {
  const [selectedTab, setSelectedTab] = useState('positions');

  // Calculate real-time P/L for positions
  const calculatePnL = (position) => {
    const currentPrice = marketPrices[position.symbol] || position.entryPrice;
    const priceDiff = position.side === 'buy' 
      ? (currentPrice - position.entryPrice) 
      : (position.entryPrice - currentPrice);
    
    const contractSize = {
      'BTC/USDT': 0.001,
      'ETH/USDT': 0.01,
      'EUR/USD': 1000,
      'XAU/USD': 1,
      'GER40': 0.1
    }[position.symbol] || 1;
    
    const pnlAVRX = priceDiff * position.quantity * contractSize;
    const pnlPercent = (pnlAVRX / position.riskAmount) * 100;
    
    return { pnlAVRX, pnlPercent };
  };

  const formatPrice = (price, symbol) => {
    const decimals = {
      'BTC/USDT': 1,
      'ETH/USDT': 2,
      'EUR/USD': 5,
      'XAU/USD': 2,
      'GER40': 1
    }[symbol] || 2;
    
    return parseFloat(price).toFixed(decimals);
  };

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-4 bg-card border rounded-lg">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="positions" className="relative">
            Positions
            {positions.length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {positions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="orders" className="relative">
            Orders
            {orders.length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {orders.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* Positions Tab */}
        <TabsContent value="positions" className="mt-4">
          {positions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No open positions</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Entry</TableHead>
                    <TableHead>Current</TableHead>
                    <TableHead>SL</TableHead>
                    <TableHead>TP</TableHead>
                    <TableHead>P/L</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positions.map((position) => {
                    const pnl = calculatePnL(position);
                    const currentPrice = marketPrices[position.symbol] || position.entryPrice;
                    
                    return (
                      <TableRow key={position.id}>
                        <TableCell className="font-medium">
                          {position.symbol}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {position.side === 'buy' ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className={position.side === 'buy' ? 'text-green-500' : 'text-red-500'}>
                              {position.side.toUpperCase()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">
                          {position.quantity}
                        </TableCell>
                        <TableCell className="font-mono">
                          {formatPrice(position.entryPrice, position.symbol)}
                        </TableCell>
                        <TableCell className="font-mono">
                          {formatPrice(currentPrice, position.symbol)}
                        </TableCell>
                        <TableCell className="font-mono text-red-500">
                          {formatPrice(position.stopLoss, position.symbol)}
                        </TableCell>
                        <TableCell className="font-mono text-green-500">
                          {formatPrice(position.takeProfit, position.symbol)}
                        </TableCell>
                        <TableCell>
                          <div className="text-right">
                            <div className={`font-mono ${pnl.pnlAVRX >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {pnl.pnlAVRX >= 0 ? '+' : ''}{pnl.pnlAVRX.toFixed(2)} AVRX
                            </div>
                            <div className={`text-xs ${pnl.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {pnl.pnlPercent >= 0 ? '+' : ''}{pnl.pnlPercent.toFixed(1)}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Close Position</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to close this {position.symbol} {position.side} position?
                                  <br />
                                  <br />
                                  Current P/L: <span className={pnl.pnlAVRX >= 0 ? 'text-green-500' : 'text-red-500'}>
                                    {pnl.pnlAVRX >= 0 ? '+' : ''}{pnl.pnlAVRX.toFixed(2)} AVRX
                                  </span>
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => onClosePosition(position.id, pnl.pnlAVRX)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Close Position
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="mt-4">
          {orders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No pending orders</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>SL</TableHead>
                    <TableHead>TP</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.symbol}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {order.type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {order.side === 'buy' ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className={order.side === 'buy' ? 'text-green-500' : 'text-red-500'}>
                            {order.side.toUpperCase()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">
                        {order.quantity}
                      </TableCell>
                      <TableCell className="font-mono">
                        {formatPrice(order.entryPrice, order.symbol)}
                      </TableCell>
                      <TableCell className="font-mono text-red-500">
                        {formatPrice(order.stopLoss, order.symbol)}
                      </TableCell>
                      <TableCell className="font-mono text-green-500">
                        {formatPrice(order.takeProfit, order.symbol)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDateTime(order.timestamp)}
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to cancel this {order.symbol} {order.side} {order.type} order?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Keep Order</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onCancelOrder(order.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Cancel Order
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="mt-4">
          {history.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No trading history</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Entry</TableHead>
                    <TableHead>Exit</TableHead>
                    <TableHead>P/L</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell className="text-sm">
                        {formatDateTime(trade.closedAt)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {trade.symbol}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {trade.side === 'buy' ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className={trade.side === 'buy' ? 'text-green-500' : 'text-red-500'}>
                            {trade.side.toUpperCase()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">
                        {trade.quantity}
                      </TableCell>
                      <TableCell className="font-mono">
                        {formatPrice(trade.entryPrice, trade.symbol)}
                      </TableCell>
                      <TableCell className="font-mono">
                        {formatPrice(trade.exitPrice, trade.symbol)}
                      </TableCell>
                      <TableCell>
                        <div className="text-right">
                          <div className={`font-mono ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)} AVRX
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-3">Account Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Balance:</span>
                  <span className="font-mono">{balance.toFixed(2)} AVRX</span>
                </div>
                <div className="flex justify-between">
                  <span>Equity:</span>
                  <span className="font-mono">{equity.toFixed(2)} AVRX</span>
                </div>
                <div className="flex justify-between">
                  <span>Floating P/L:</span>
                  <span className={`font-mono ${(equity - balance) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {(equity - balance) >= 0 ? '+' : ''}{(equity - balance).toFixed(2)} AVRX
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Open Positions:</span>
                  <span>{positions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Orders:</span>
                  <span>{orders.length}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-3">Risk Settings</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Max Risk per Trade:</span>
                  <span className="font-mono">5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Currency:</span>
                  <span className="font-mono">AVRX</span>
                </div>
                <div className="flex justify-between">
                  <span>Exchange Rate:</span>
                  <span className="font-mono">1 AVRX = 1 USD</span>
                </div>
                <div className="flex justify-between">
                  <span>Account Type:</span>
                  <span>Demo</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PositionTabs;