/*
Violet - A program for editing UML diagrams.

Copyright (C) 2002 Cay S. Horstmann (http://horstmann.com)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

package com.horstmann.violet;

import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
import java.util.ArrayList;

/**
   An edge that joins two call nodes.
*/
public class CallEdge extends SegmentedLineEdge
{
   public CallEdge()
   {
      setSignal(false);
   }

   /**
      Gets the signal property.
      @return true if this is a signal edge
   */
   public boolean isSignal() { return signal; }

   /**
      Sets the signal property.
      @param newValue true if this is a signal edge
   */      
   public void setSignal(boolean newValue) 
   { 
      signal = newValue; 
      if (signal)
         setEndArrowHead(ArrowHead.HALF_V);
      else
         setEndArrowHead(ArrowHead.V);
   }

   public ArrayList getPoints()
   {
      ArrayList a = new ArrayList();
      Node n = getEnd();
      if (n instanceof CallNode &&
         ((CallNode)n).getImplicitParameter() ==
         ((CallNode)getStart()).getImplicitParameter())
      {
         Point2D p = new Point2D.Double(getStart().getBounds().getMaxX(), getEnd().getBounds().getY() - CallNode.CALL_YGAP / 2);
         Point2D q = new Point2D.Double(getEnd().getBounds().getMaxX(), getEnd().getBounds().getY());
         Point2D s = new Point2D.Double(q.getX() + getEnd().getBounds().getWidth(), q.getY());
         Point2D r = new Point2D.Double(s.getX(), p.getY());
         a.add(p);
         a.add(r);
         a.add(s);
         a.add(q);
      }
      else
      {
         Rectangle2D start = getStart().getBounds();
         Rectangle2D end = getEnd().getBounds();
         Direction d = new Direction(start.getX() - end.getX(), 0);
         Point2D endPoint = getEnd().getConnectionPoint(d);
         
         if (start.getCenterX() < endPoint.getX())
            a.add(new Point2D.Double(start.getMaxX(),
                     endPoint.getY()));
         else
            a.add(new Point2D.Double(start.getX(),
                     endPoint.getY()));
         a.add(endPoint);
      }
      return a;
   }

   private boolean signal;
}


