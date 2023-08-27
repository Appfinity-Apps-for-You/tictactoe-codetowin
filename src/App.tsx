import { Box, ListItem, Typography } from '@mui/material'
import './App.css'
import Button from '@mui/material/Button'
import { MouseEvent, useState } from 'react'
import { List } from '@mui/material'
import { ListItemButton,ListItemIcon,ListItemText } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { ArrowCircleRight } from '@mui/icons-material'
import Fade from '@mui/material/Fade'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Link from '@mui/material/Link'
import { ReactComponent as BMCButton } from './assets/Icons/bmc-button.svg'
import { Adsense } from '@ctrl/react-adsense'
import { Helmet } from 'react-helmet'
import useGetDeviceType from './hooks/useGetDeviceType'

type SquareItem =  {
  value: string | null
  buttonVariant: 'contained' | 'outlined' 
}

type SquareProps = {
  value: string | null
  onSquareClick: (event: MouseEvent<HTMLButtonElement>) => void
  buttonVariant: 'text' | 'contained' | 'outlined' 
}

type BoardProps = {
  xIsNext: boolean
  squares: SquareItem[]
  index: number
  onPlay: (nextSquares: SquareItem[], index:number) => void
}

type HistoryRecord = {
  board: SquareItem[]
  moveIndex: number
}

function Square(prop: SquareProps) {
  return (
    <Button 
      className = 'square'
      variant = {prop.buttonVariant}
      onClick = {prop.onSquareClick}
      sx = {{
        margin: '4px',
        borderColor: '#cccccc',
        borderWidth: '2px',
        borderRadius: 0,
        fontWeight: '600',
        minHeight:'48px',
      }}
    >
      {prop.value}
    </Button>
  )
}

function calculateWinner(squares: SquareItem []): string | null {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for (let i: number = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
      squares[a].buttonVariant = 'contained'
      squares[b].buttonVariant = 'contained'
      squares[c].buttonVariant = 'contained'
      return squares[a].value
    }
  }
  return null
}

function checkForTie (squares: SquareItem[]): boolean {
  for (let i: number = 0; i < squares.length; i++ ) {
    if (!squares[i].value) {
      return false
    }
  }
  return true
}

function Board (prop: BoardProps) {
 
  const handleClick = (i: number) => {
    if (prop.squares[i].value || calculateWinner(prop.squares)) {
      return
    }
    const nextSquares = prop.squares.slice().map(m => ({...m}))
    let nextIndex = prop.index
    if (prop.xIsNext) {
      nextSquares[i].value = 'X'
      nextIndex = i+1
    } else {
      nextSquares[i].value = 'O'
      nextIndex = i+1
    }
    prop.onPlay(nextSquares,nextIndex)
  }
  let status: {
    text: string
    color: string
  }
  const winner = calculateWinner(prop.squares)

  switch (true) {
    case winner != null:
      status = {
        text: `The winner is: ${winner}. Congrats! 🎊 `,
        color: 'green'
      }
    break
    case checkForTie(prop.squares):
      status = {
        text: 'Oh no! There is a tie 🤖',
        color: 'black'
      }
    break
    default:
      status = {
        text: `Next move: ${(prop.xIsNext ? 'X' : 'O')}`,
        color: 'primary.main'
      }
  }

  const renderBoard = ()=> {
    const board = []
    
    for (let i = 0; i < 3; i++) {
      const row = []
      for (let j = 0; j < 3; j++) {
        row.push(
          <Square
            key = {`xxx-${(i * 3) + j}`}
            value = {prop.squares[(i * 3) + j].value}
            buttonVariant = {prop.squares[(i * 3) + j].buttonVariant}
            onSquareClick = {() => {
              handleClick ((i * 3) + j)
            }}
          />
        )
      }

      board.push(<Box className='board-row' key={`yyy-${i}`}>{row}</Box>)
      }
      return board
    }  

  return (
    <>
      <Typography 
        className= 'status'
        variant= 'h4' 
        fontSize= '1.5rem'
        sx={{
          marginBottom: '16px',
          color: status.color
        }}
        >
        {status.text}
      </Typography>
      {renderBoard()}
    </>
  )
}

function ControlledAccordions() {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  return (
    <div>
      <Accordion expanded= {expanded === 'panel1'} onChange= {handleChange('panel1')}>
        <AccordionSummary
          expandIcon= {<ExpandMoreIcon/>}
          aria-controls= 'panel1bh-content'
          id= 'panel1bh-header'
        >
          <Typography variant= 'h3' fontSize= '1.5rem' color= 'primary.main'>What is Tic Tac Toe Game?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Tic Tac Toe, also known as "Noughts and Crosses" or "X's and O's" in some regions, is a simple two-player strategy game. 
            With a grid comprised of three rows and three columns, players take turns marking a square with their symbol – 
            typically an "X" or an "O". The primary objective is to be the first to get three of your symbols in a row, 
            whether that be horizontally, vertically, or diagonally.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon= {<ExpandMoreIcon/>}
          aria-controls= 'panel2bh-content'
          id= 'panel2bh-header'
        >
          <Typography variant= 'h3' fontSize= '1.5rem' color= 'primary.main'>Why Play Tic Tac Toe?</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <ol>
              <li>
                <b>Ease of Play:</b> With its simple rules, Tic Tac Toe is accessible to all ages. 
                It's an ideal starter game for young children while still being engaging for adults.
              </li>
              <li>
                <b>Brain Boost:</b> Tic Tac Toe helps in enhancing critical thinking and strategy skills. 
                It's more than just placing symbols; it's about predicting your opponent's moves and countering them.
              </li>
              <li>
                <b>Portability:</b> A game of Tic Tac Toe can be played virtually anywhere, 
                from sketching it out on a piece of paper to modern digital apps on your smartphone or laptop.
              </li>
            </ol>
          </AccordionDetails>
      </Accordion>
      <Accordion expanded= {expanded === 'panel3'} onChange= {handleChange('panel3')}>
        <AccordionSummary
          expandIcon= {<ExpandMoreIcon/>}
          aria-controls= 'panel3bh-content'
          id= 'panel3bh-header'
        >
          <Typography variant= 'h3' fontSize= '1.5rem' color= 'primary.main'>Tips for Winning at Tic Tac Toe</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <ol>
              <li>
                <b>Begin in the Center:</b> Starting your move in the center gives you a higher chance of winning, 
                as it opens up more opportunities to complete a sequence.
              </li>
              <li>
                <b>Corner Strategy:</b> If you can't start in the center, opt for a corner. 
                This move can potentially set you up for two ways to win.
              </li>
              <li>
                <b>Block Your Opponent:</b> Always keep an eye out for any potential 
                winning moves from your opponent and block them when possible.
              </li>
            </ol>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded= {expanded === 'panel4'} onChange= {handleChange('panel4')}>
        <AccordionSummary
          expandIcon= {<ExpandMoreIcon/>}
          aria-controls= 'panel4bh-content'
          id= 'panel4bh-header'
        >
          <Typography variant= 'h3' fontSize= '1.5rem' color= 'primary.main'>Conclusion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            In the digital age, where complex video games reign supreme, there's an undeniable charm 
            in the simplicity and strategic depth of Tic Tac Toe Game. Whether you're waiting at a restaurant,
            taking a quick break, or introducing games to the younger generation, this timeless classic promises endless fun. 
            Dive into the world of Tic Tac Toe today and challenge your friends and family!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

function Game() {
  const restingSquare: SquareItem = {value: null, buttonVariant: 'outlined'}
  const [history, setHistory] = useState<HistoryRecord[]>([{
    board: Array(9).fill({}).map(() => ({ ...restingSquare })),
    moveIndex: 0
  }])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove].board
  const currentIndex = history[currentMove].moveIndex

  function handlePlay(nextSquares: SquareItem[], nextIndex:number){   
    const nextHistoryRecord: HistoryRecord = {board: nextSquares, moveIndex: nextIndex}
    const nextHistory = [...history.slice(0, currentMove + 1), nextHistoryRecord]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length-1)
  }

  const jumpTo = (nextMove:number) => {
    setCurrentMove(nextMove)
    setHistory(history.slice(0,nextMove+1))
  }

  const resetBoard = () => {
    setHistory(([{
      board: Array(9).fill({}).map(() => ({ ...restingSquare })),
      moveIndex: 0
    }]))
    setCurrentMove(0)
  }

  const moves = history.map((_, move) => {
    let description: string
    if (move === history.length-1) {
      description = move === 0 ? `Start` : `Move # ${move}, ( ${Math.ceil(history[move].moveIndex/3)}, ${(history[move].moveIndex-1)%3+1} )`
      return (
        <Fade key={move} in={true}>
          <ListItem >
            <ListItemIcon
              sx = {{
              color: 'primary.main'
              }}
            >
              <ArrowCircleRight></ArrowCircleRight>
            </ListItemIcon>
            <ListItemText>
              {description}
            </ListItemText>
          </ListItem>
        </Fade>
      )
    } else if (move > 0){
      description = `Back to move # ${move}, ( ${Math.ceil(history[move].moveIndex/3)},${(history[move].moveIndex-1)%3+1})`
    } else {
      description = 'Back to the start'
    }
    return (
      <Fade key={move} in={true}>
        <ListItemButton
          onClick={() => jumpTo(move)}
          alignItems='center'
          sx = {{
            ':hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
            },
            '& .MuiTouchRipple-root': {
              color: 'rgba(25, 118, 210)',
            }
          }}
        >
          <ListItemIcon
            sx = {{
              color: 'primary.main'
            }}
          >
            <ArrowCircleRight/>
          </ListItemIcon>
          <ListItemText>
            {description}
          </ListItemText>
        </ListItemButton>
      </Fade>
    )
  })

  const [order, setOrder] = useState('ASC')

  const handleChange = ( _: React.MouseEvent<HTMLElement>, newOrder: string ) => {
    setOrder(newOrder)
  }

  const { isDesktop } = useGetDeviceType()

  return (
      <Box sx={{ flexGrow: 1}} display='flex' flexDirection= 'row' justifyContent='center'>
        <Helmet>
          <title>Tic Tac Toe: Code to Win</title>
          <meta name= 'description' content= 'Tic Tac Toe - Code to Win is a learning frontend project combining React, TypeScript, Vite and MUI components.' />
          <meta property= 'og:title' content= 'Tic Tac Toe - Code to Win' />
          <meta property= 'og:type' content= 'website' />
          <meta property= 'og:description' content= 'Tic Tac Toe - Code to Win is a learning frontend project combining React, TypeScript, Vite and MUI components.' />
          <meta property= 'og:image' content= '/src/assets/images/tictactoe-fb.png' />
          <meta property= 'og:url' content= 'https://tic-tac-toe.games' />
          <meta name= 'robots' content= 'index,follow' />
        </Helmet>
        <Grid container spacing= {{xs: 2, md: 3}} >
          <Grid xs= {12} md= {2} textAlign= 'center' sx= {{ display: { xs: 'none', md: 'block' } }}>
            <Typography variant= 'body2' color= 'gray'>ADD</Typography>
            <Box
              height= '600px'
              sx={{
                backgroundColor: 'lightgray'
              }}
            >
              { 
                isDesktop && <Adsense
                  client= 'ca-pub-XXX'
                  slot= 'YYY'
                  adTest= 'on'
                  format= 'auto'
                  responsive= 'true'
                  style= {{ display: 'block' }}
                />
              }
            </Box>
          </Grid>
          <Grid container xs= {12} md= {8}>
              <Grid xs= {12} display= 'flex' flexDirection= 'column' alignItems= 'center'>
                 <Typography variant= 'h1' display= 'none'>
                    Tic Tac Toe: React, MUI and TypeScript learning project
                </Typography>
                <Typography variant= 'h2' fontSize= '4.5rem'>
                    Tic Tac Toe
                </Typography>
                <Typography variant= 'h3' fontSize= '3rem'>
                    Code to Win
                </Typography>
                <Button
                  variant= 'contained'
                  sx= {{
                    my: '1.5rem'
                  }}
                  onClick= {() => resetBoard()}
                >
                  Click to reset the game
                </Button>
              </Grid>
              <Grid xs= {12} md= {6} display= 'block' direction= 'column' alignItems= 'center' textAlign= 'center'>
                <Box className= 'board'>
                  <Typography variant= 'h3' fontSize= '2rem'>
                    Game
                  </Typography>
                  <Box
                    sx={{
                      marginTop: '1rem'
                    }}
                  >
                    <Board 
                      xIsNext= {xIsNext}
                      squares= {currentSquares}
                      index= {currentIndex}
                      onPlay= {handlePlay}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid xs= {12} md= {6} display= 'block' direction= 'column' alignItems= 'center' textAlign= 'center'>
                <Box className= 'dashboard'>
                  <Typography variant= 'h3' fontSize= '2rem'>
                    List of moves
                  </Typography>

                  <ToggleButtonGroup
                    color= 'primary'
                    value= {order}
                    exclusive
                    onChange= {handleChange}
                    sx= {{
                      marginTop: '1rem'
                    }}
                  >
                    <ToggleButton value= 'ASC'>ASC</ToggleButton>
                    <ToggleButton value= 'DESC'>DESC</ToggleButton>
                  </ToggleButtonGroup>
                  
                  <List
                    sx = {{
                      px:2
                    }}
                  >
                    {(order === 'DESC') ? moves.reverse() : moves}
                  </List>
                </Box>
              </Grid>
              <Grid xs= {12} display= 'block' direction= 'column' justifyContent= 'center' alignItems= 'center' textAlign= 'center'>
                <Box sx={{my: '1rem', padding: '1rem'}}>
                  <Typography variant= 'body1' fontSize= '1.25rem' color= 'grey' marginBottom= '2rem'>Want to check source code of this learning project? Visit our GitHub account - link below ↓ </Typography>
                  <Typography variant= 'body2' color= 'gray'>ADD</Typography>
                  <Box
                    sx= {{
                      backgroundColor: 'lightgray'
                    }}
                  >
                    <Adsense
                      client= 'ca-pub-XXX'
                      slot= 'YYY'
                      adTest= 'on'
                      format= 'auto'
                      responsive= 'true'
                      style= {{display: 'block'}}
                    />
                  </Box>
                </Box>
                <Typography variant= 'h2' fontSize= '3rem'>
                    Tic Tac Toe: <br/> The Classic Game of Strategy
                </Typography>

                <Box margin= '1.5rem' textAlign= 'left'>
                  <ControlledAccordions></ControlledAccordions>
                </Box>

                <Box sx={{my: '1rem', padding: '1rem'}}>
                  <Typography variant= 'body2' color= 'gray'>ADD</Typography>
                  <Box
                    sx={{
                      backgroundColor: 'lightgray'
                    }}
                  >
                    <Adsense
                      client= 'ca-pub-XXX'
                      slot= 'YYY'
                      adTest= 'on'
                      format= 'auto'
                      responsive= 'true'
                      style= {{display: 'block'}}
                    />
                  </Box>
                </Box>

                <Typography >
                  <b>Hi, it's Magda!</b><br/><br/>
                  I am UX designer at <Link href='https://appfinity.pl'>Appfinity</Link>. <b>"Tic Tac Toe: Code to Win"</b> is my learning project. 
                  I decided to learn frontend development to become more effective designer, understanding how my designs work when implemented.  
                  This project is powered by cutting-edge technology, drawing inspiration from the <Link href='https://react.dev/'>React.dev</Link> tutorial 
                  and leveraged by <Link href='https://mui.com/'>MUI</Link> components as well as <Link href='https://www.typescriptlang.org/'>TypeScript</Link>. 
                  The SPA application development environment is set up using <Link href='https://vitejs.dev/'>Vite</Link>, a robust frontend tool. 
                  The layout is designed to remain fully responsive, thanks to MUI breakpoints and a dynamic grid. <br/><br/>
                  Do you want to start frontend development the same as I do? Do you wonder how to connect powerful tools like React, MUI and TypeScript in one project? 
                  Feel free to explore the source code of <b>"Tic Tac Toe: Code to Win"</b> on our <Link href='https://appfinity.pl'>Github repository</Link>. 
                  Whether you choose to replicate, modify, or completely rewrite the code, this is your chance to empower your skills. <span color='blue'><b>Start shaping your future today!</b></span>
                </Typography>


                <Box sx= {{padding: ' 1rem 0 2rem 0 '}}>
                  <Button 
                    variant= 'contained' 
                    disableElevation
                    disableRipple
                    href= 'https://www.buymeacoffee.com/magdaappfinity'

                    sx= {{
                      backgroundColor: 'white',
                      '&:hover': {
                        background: 'white'
                      }
                    }}
                  >
                    <BMCButton width= {'217px'} height= {'60px'}/>
                  </Button>
                </Box>

                <Typography variant= 'body2' align= 'center' sx= {{my:'1rem'}}>
                  Copyright {new Date().getFullYear()} <Link href= 'https://appfinity.pl'>Appfinity</Link>
                </Typography>
                
                <Typography variant= 'body2' align= 'center' sx= {{my:'1rem'}}>                
                  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), 
                  to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
                  and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:<br/><br/>
                  
                  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br/><br/>
                  
                  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
                  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
                  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
                </Typography>

              </Grid>
          </Grid>
          <Grid xs= {12} md= {2} textAlign= 'center' sx= {{ display: { xs: 'none', md: 'block' } }} >
            <Typography variant= 'body2' color= 'gray'>ADD</Typography>
            <Box
              height= '600px'
              sx= {{
                backgroundColor: 'lightgray'
              }}
            >
              {
                isDesktop && <Adsense
                  client= 'ca-pub-XXX'
                  slot= 'YYY'
                  adTest= 'on'
                  format= 'auto'
                  responsive= 'true'
                  style= {{ display: 'block' }}
                />
              }
            </Box>
          </Grid>
        </Grid>
      </Box>
  )
}

export default Game
